import ConnectDB from "@/config/database";
import { NextRequest } from "next/server";

export const POST = async (request : NextRequest) => {
    // TODO: Add new form data

    const {  } = await request.json();

    try {
        ConnectDB();

    } catch (error) {
        
    }
}


export const GET = async () => {
    // TODO: Get all forms data from database

    try {
        ConnectDB();

    } catch (error) {
        
    }
}