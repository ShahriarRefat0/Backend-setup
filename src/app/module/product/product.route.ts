import { Router } from "express";
import { auth } from "../../middleware/auth";
import { ProductController } from "./product.controller";


const router: Router =Router();

router.post('/',auth(["MERCHANT"]) , ProductController.createProduct);

router.get('/', ProductController.getAllProducts)

router.get('/:id', ProductController.getSingleProduct)

router.patch('/:id', auth(["MERCHANT"]), ProductController.updateProduct)

router.delete('/:id', auth(["MERCHANT"]), ProductController.deleteProduct)


export const ProductRoute = router;