import prisma from '../lib/prisma.js';

export const addPostController = async (req, res) => {
    const userId = req.userId;

    const post = await prisma.post.create({
        data: {
            ...req.body,
            userId
        }
    })

    res.status(201).json({
        success: true,
        message: 'Post added successfully',
        data: post
    })
}

export const getAllPostsController = async (req, res) => {
    const posts = await prisma.post.findMany({
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

export const getPostController = async (req, res) => {
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

    res.status(200).json({
        success: true,
        message: 'Post fetched successfully',
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

    const updatedPost = await prisma.post.update({
        where: {
            id: postId
        },
        data: updateData
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