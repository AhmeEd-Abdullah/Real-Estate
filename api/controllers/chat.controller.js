import prisma from '../lib/prisma.js';
import appError from '../utilities/globalError.js';
import httpStatusText from '../utilities/httpStatusText.js';

export const getChatsController = async (req, res, next) => {
    const userId = req.userId;

    const chats = await prisma.chat.findMany({
        where: {
            userIDs: {
                hasSome: [userId],
            },
        },
        include: {
            users: {
                select: {
                    id: true,
                    username: true,
                    avatar: true,
                },
            },
            // messages: {
            //     orderBy: {
            //         createdAt: 'desc',
            //     },
            //     take: 1,
            // },
        },
        orderBy: {
            updatedAt: 'desc',
        },
    });

    res.status(200).json({
        success: true,
        message: 'Chats fetched successfully',
        data: chats,
    });
};

export const getChatController = async (req, res, next) => {
    const userId = req.userId;
    const { id } = req.params;

    const chat = await prisma.chat.findFirst({
        where: {
            id,
            userIDs: {
                hasSome: [userId],
            },
        },
        include: {
            users: {
                select: {
                    id: true,
                    username: true,
                    avatar: true,
                },
            },
            messages: {
                orderBy: {
                    createdAt: 'asc',
                },
            },
        },
    });

    if (!chat) {
        return next(appError.create(httpStatusText.fail, 404, 'Chat not found'));
    }

    res.status(200).json({
        success: true,
        message: 'Chat fetched successfully',
        data: chat,
    });
};

export const addChatController = async (req, res, next) => {
    const userId = req.userId;
    const receiverId = req.body.receiverId;

    if (!receiverId) {
        return next(appError.create(httpStatusText.fail, 400, 'Receiver id is required'));
    }

    if (receiverId === userId) {
        return next(appError.create(httpStatusText.fail, 400, 'You cannot start a chat with yourself'));
    }

    const receiver = await prisma.user.findUnique({
        where: { id: receiverId },
        select: { id: true },
    });

    if (!receiver) {
        return next(appError.create(httpStatusText.fail, 404, 'Receiver not found'));
    }

    const existingChat = await prisma.chat.findFirst({
        where: {
            userIDs: {
                hasEvery: [userId, receiverId],
            },
        },
    });

    if (existingChat) {
        return res.status(200).json({
            success: true,
            message: 'Chat already exists',
            data: existingChat,
        });
    }

    const chat = await prisma.chat.create({
        data: {
            userIDs: [userId, receiverId],
            seenBy: [userId],
        },
        include: {
            users: {
                select: {
                    id: true,
                    username: true,
                    avatar: true,
                },
            },
        },
    });

    res.status(201).json({
        success: true,
        message: 'Chat created successfully',
        data: chat,
    });
};

export const readChatController = async (req, res, next) => {
    const userId = req.userId;
    const { id } = req.params;

    const chat = await prisma.chat.findUnique({
        where: { id },
    });

    if (!chat) {
        return next(appError.create(httpStatusText.fail, 404, 'Chat not found'));
    }

    if (!chat.userIDs.includes(userId)) {
        return next(appError.create(httpStatusText.fail, 403, 'No Permission'));
    }

    const updatedSeenBy = Array.from(new Set([...chat.seenBy, userId]));

    const updatedChat = await prisma.chat.update({
        where: { id },
        data: {
            seenBy: {
                set: updatedSeenBy,
            },
        },
    });

    res.status(200).json({
        success: true,
        message: 'Chat marked as read',
        data: updatedChat,
    });
};
