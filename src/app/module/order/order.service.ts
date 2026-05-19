import { prisma } from "../../../lib/prisma"


const createOrder = async (payload: any, customerId: string) => {
  const order = await prisma.order.create({
    data: {
        customerId,
        totalPrice: payload.totalPrice,
    }
  });

  const orderItems = await prisma.orderItem.create({
    data: {
        orderId: order.id,
        productId: payload.productId,
        quantity: payload.quantity,
        price: payload.totalPrice,
    }
  })

  return {
    order, orderItems,
  }
};

const getAllOrders = async()=>{
    return await prisma.order.findMany({
        select:{
            id: true,
            totalPrice: true,
            status: true,
            createdAt: true,
            updatedAt: true,
            orderItems: {
                select:{
                    id: true,
                    productId: true,
                    quantity: true,
                    price: true,
                }
            },
            customer: {
                select:{
                    id:true,
                    name: true,
                    email: true
                }
            }   
        }
    })
}


const confirmOrder = async (orderId: string) => {
    return await prisma.order.update({
        where: { id: orderId },
        data: { status: "CONFIRMED" }
    });
}


const cancleOrder = async(orderId: string)=>{
    const order = await prisma.order.findUnique({
        where: {id: orderId},
    });

    if(order &&order.status === "CONFIRMED"){
throw new Error("Confirm order can not be cancelled");
    }

    return await prisma.order.update({
        where: {id: orderId},
        data: {status: "REJECTED"}
    });
}



export const OrderService ={
    createOrder,
    getAllOrders,
    confirmOrder,
    cancleOrder
}