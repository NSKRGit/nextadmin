"use server"
import bcrypt from "bcrypt";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { signIn } from "../auth";
import { Product, User } from "./models";
import { connectToDB } from "./utils";

export const addUser = async(formData) => {
    const { username, email, password, phone, address, isAdmin, isActive } = Object.fromEntries(formData);

    try {
        connectToDB();
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const newUser = new User({
            username, 
            email, 
            password: hashedPassword, 
            phone, 
            address, 
            isAdmin, 
            isActive,
        });
        await newUser.save();
    } catch (error) {
        console.log(error);
        throw new Error("Failed to create User!");
    }
    revalidatePath("/dashboard/users");
    redirect("/dashboard/users");
};

export const addProduct = async(formData) => {
    const { title, desc, price, stock, color, size } = Object.fromEntries(formData);

    try {
        connectToDB();
        const newProduct = new Product({
            title, 
            desc, 
            price, 
            stock, 
            color, 
            size,
        });
        await newProduct.save();
    } catch (error) {
        console.log(error);
        throw new Error("Failed to create Product!");
    }
    revalidatePath("/dashboard/products");
    redirect("/dashboard/products");
};

export const updateUser = async(formData) => {
    const { id, username, email, phone, address, isAdmin, isActive } = Object.fromEntries(formData);

    try {
        connectToDB();
        const updateFields = {
            username, 
            email, 
            phone, 
            address, 
            isAdmin, 
            isActive,
        };
        Object.keys(updateFields).forEach((key) => (updateFields[key] === "" || undefined) && delete updateFields[key]);
        await User.findByIdAndUpdate(id, updateFields);
    } catch (error) {
        console.log(error);
        throw new Error("Failed to update User!");
    }
    revalidatePath("/dashboard/users");
    redirect("/dashboard/users");
};

export const updateProduct = async(formData) => {
    const { id, title, desc, price, stock, color, size } = Object.fromEntries(formData);

    try {
        connectToDB();
        const updateFields = {
            title, 
            desc, 
            price, 
            stock, 
            color, 
            size,
        };
        Object.keys(updateFields).forEach((key) => (updateFields[key] === "" || undefined) && delete updateFields[key]);
        await Product.findByIdAndUpdate(id, updateFields);
    } catch (error) {
        console.log(error);
        throw new Error("Failed to update Product!");
    }
    revalidatePath("/dashboard/products");
    redirect("/dashboard/products");
};

export const deleteUser = async(formData) => {
    const { id } = Object.fromEntries(formData);

    try {
        connectToDB();
        await deleteUser.findByIdAndDelete(id);
    } catch (error) {
        console.log(error);
        throw new Error("Failed to delete User!");
    }
    revalidatePath("/dashboard/users");
};

export const deleteProduct = async(formData) => {
    const { id } = Object.fromEntries(formData);

    try {
        connectToDB();
        await Product.findByIdAndDelete(id);
    } catch (error) {
        console.log(error);
        throw new Error("Failed to delete Product!");
    }
    revalidatePath("/dashboard/products");
};

export const authenticate = async (prevState, formData) => {
    const { username, password } = Object.fromEntries(formData);

    try {
        await signIn("credentials", { username, password });
    } catch (error){
        return "Wrong Credentials!"
    }
}