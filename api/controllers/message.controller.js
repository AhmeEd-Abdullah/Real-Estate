import prisma from '../lib/prisma.js';
import appError from '../utilities/globalError.js';
import httpStatusText from '../utilities/httpStatusText.js';

export const getMessagesController = async (req, res, next) => {
    const userId = req.userId;
    const { chatId } = req.params;

    const chat = await prisma.chat.findFirst({
        where: {
            id: chatId,
            userIDs: {
                has: userId,
            },
        },
    });

    if (!chat) {
        return next(appError.create(httpStatusText.fail, 404, 'Chat not found'));
    }

    const messages = await prisma.message.findMany({
        where: { chatId },
        orderBy: {
            createdAt: 'asc',
        },
    });

    res.status(200).json({
        success: true,
        message: 'Messages fetched successfully',
        data: messages,
    });
};

export const addMessageController = async (req, res, next) => {
    const userId = req.userId;
    const { chatId, text } = req.body;

    if (!chatId || !text) {
        return next(appError.create(httpStatusText.fail, 400, 'Chat id and text are required'));
    }

    const chat = await prisma.chat.findFirst({
        where: {
            id: chatId,
            userIDs: {
                has: userId,
            },
        },
    });

    if (!chat) {
        return next(appError.create(httpStatusText.fail, 404, 'Chat not found'));
    }

    const message = await prisma.message.create({
        data: {
            text,
            senderId: userId,
            chatId,
        },
    });

    await prisma.chat.update({
        where: { id: chatId },
        data: {
            lastMessage: text,
            seenBy: {
                set: [userId],
            },
        },
    });

    res.status(201).json({
        success: true,
        message: 'Message sent successfully',
        data: message,
    });
};
