import ConnectDB from "@/config/database";

export const GET = async () => {
    // TODO: Get all applications by given formId from the url

    try {
        ConnectDB();

    } catch (error) {
        
    }
}

export const DELETE = async () => {
    // TODO: Delete all applications by given formId from the url
    // Bu fonksiyon form silindiğinde de çalıştırılmalı ki veri kirliliğinin önüne geçilebilsin.

    try {
        ConnectDB();

    } catch (error) {
        
    }
}