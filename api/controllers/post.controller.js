import prisma from '../lib/prisma.js';
import { normalizeString, normalizePostPayload } from '../utilities/postQuery.js';
import appError from '../utilities/globalError.js';
import httpStatusText from '../utilities/httpStatusText.js';
import jwt from 'jsonwebtoken';

export const addPostController = async (req, res) => {
    const userId = req.userId;
    const normalizedPostInfo = normalizePostPayload(req.body.postInfo || {});
    const normalizedPostDetails = normalizePostPayload(req.body.postDetails || {});

    const post = await prisma.post.create({
        data: {
            ...normalizedPostInfo,
            userId,
            postDetails: {
                create: normalizedPostDetails
            }
        }
    })

    res.status(201).json({
        success: true,
        message: 'Post added successfully',
        data: post
    })
}

export const getAllPostsController = async (req, res) => {
    const queries = req.query;

    const posts = await prisma.post.findMany({
        where: {
            city: queries.location || undefined,
            type: queries.type || undefined,
            property: queries.property || undefined,
            bedroom: parseInt(queries.bedroom) || undefined,
            price: {
                gte: parseInt(queries.minPrice) || 0,
                lte: parseInt(queries.maxPrice) || undefined
            },
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    res.status(200).json({
        success: true,
        message: 'Posts fetched successfully',
        data: posts
    })
}

export const getPostController = async (req, res, next) => {
    const { id: postId } = req.params;
    const token = req.cookies.token;
    let userId = null;

    if (token) {
        const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
        userId = payload.id;
    }

    const postPromise = prisma.post.findUnique({
        where: {
            id: postId
        },
        include: {
            postDetails: true,
            user: {
                select: {
                    avatar: true,
                    username: true
                }
            }
        }
    })

    const savedPostPromise = userId ? prisma.savedPost.findUnique({
        where: {
            userId_postId: {
                userId,
                postId
            }
        }
    }) : Promise.resolve(null);

    const [post, savedPost] = await Promise.all([
        postPromise,
        savedPostPromise
    ]);

    if (!post) {
        return res.status(404).json({
            success: false,
            message: 'Post not found'
        })
    }

    return res.status(200).json({
        success: true,
        message: 'Post fetched successfully',
        saved: !!savedPost,
        data: post
    })
}
export const updatePostController = async (req, res) => {
    const userId = req.userId;
    const postId = req.params.id;

    const post = await prisma.post.findUnique({
        where: {
            id: postId
        }
    })

    if (!post) {
        return res.status(404).json({
            success: false,
            message: 'Post not found'
        })
    }

    if (post.userId !== userId) {
        return res.status(403).json({
            success: false,
            message: 'No Permission'
        })
    }

    const allowedFields = ['title', 'price', 'images', 'address', 'city', 'bedroom', 'bathroom', 'latitude', 'longitude', 'type', 'property'];
    const updateData = {}

    allowedFields.forEach((field) => {
        if (req.body[field] !== undefined) {
            updateData[field] = req.body[field]
        }
    })

    if (Object.keys(updateData).length === 0) {
        return res.status(400).json({
            success: false,
            message: 'No valid fields provided for update'
        })
    }

    const normalizedUpdateData = normalizePostPayload(updateData);

    const updatedPost = await prisma.post.update({
        where: {
            id: postId
        },
        data: normalizedUpdateData
    })

    res.status(200).json({
        success: true,
        message: 'Post updated successfully',
        data: updatedPost
    })
}

export const deletePostController = async (req, res) => {
    const userId = req.userId;
    const postId = req.params.id;

    const post = await prisma.post.findUnique({
        where: {
            id: postId
        }
    })

    if (!post) {
        return res.status(404).json({
            success: false,
            message: 'Post not found'
        })
    }

    if (post.userId !== userId) {
        return res.status(403).json({
            success: false,
            message: 'No Permission'
        })
    }

    await prisma.post.delete({
        where: {
            id: postId
        }
    })

    res.status(200).json({
        success: true,
        message: 'Post deleted successfully'
    })
}

export const savePostController = async (req, res, next) => {
    const userId = req.userId;
    const postId = req.params.id;

    const post = await prisma.post.findUnique({
        where: {
            id: postId,
        }
    })
    if (!post) return next(appError.create(httpStatusText.fail, 404, "Post not found"));

    const where = {
        userId_postId: {
            userId,
            postId,
        },
    };
    const savedPostRecord = await prisma.savedPost.findUnique({
        where
    });

    if (savedPostRecord) {
        await prisma.savedPost.delete({
            where
        });
        return res.status(200).json({
            success: true,
            message: "Post unsaved successfully",
            saved: false,
        })
    }

    await prisma.savedPost.create({
        data: {
            userId,
            postId
        }
    });
    return res.status(200).json({
        success: true,
        message: "Post saved successfully",
        saved: true
    })
};

export const userPostsController = async (req, res) => {
    const userId = req.userId;

    const [userPosts, savedPostRecords] = await Promise.all([
        prisma.post.findMany({
            where: {
                userId
            },
            orderBy: {
                createdAt: 'desc'
            }
        }),
        prisma.savedPost.findMany({
            where: {
                userId
            },
            include: {
                post: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        })
    ]);

    const savedPosts = savedPostRecords.map((savedPost) => savedPost.post);

    return res.status(200).json({
        success: true,
        message: 'Profile posts fetched successfully',
        data: {
            myPosts: userPosts,
            savedPosts
        }
    });
};