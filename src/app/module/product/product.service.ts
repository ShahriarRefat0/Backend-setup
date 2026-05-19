import { prisma } from "../../../lib/prisma"

const createProduct=async (payload: any, userId: string)=>{
    const product = await prisma.product.create({
        data: {
            ...payload,
            createdById: userId
        }
    })
    return product
}

const getAllProducts = async()=>{
    return await prisma.product.findMany({
            select:{
        id: true,
        title: true,
        price: true,
        stock: true,

        createdBy: {
            select:{
                id:true,
                name: true,
                email: true
            }
        }
    }
    });
};

const getSingleProduct = async (id: string)=>{
    return await prisma.product.findUnique({
        where:{id}
    });
};

const updateProduct = async (id: string, payload: any)=>{
    return await prisma.product.update({
        where: {id},
        data: payload
    });
};

const deleteProduct = async (id: string)=>{
    return await prisma.product.delete({
        where: {id}
    });
}




export default {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
}