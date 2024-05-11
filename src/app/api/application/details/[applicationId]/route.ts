import ConnectDB from "@/config/database";
import { NextRequest } from "next/server";

export const GET = async () => {
    // TODO: Get the application data by given formId from the url

    try {
        ConnectDB();

    } catch (error) {
        
    }
}

export const UPDATE = async (request : NextRequest) => {
    // TODO: Update the application data by given formId from the url and given request data
    const { } = request.json();
    
    try {
        ConnectDB();

    } catch (error) {
        
    }
}

export const DELETE = async () => {
    // TODO: Delete the application data by given formId from the url

    try {
        ConnectDB();

    } catch (error) {
        
    }
}