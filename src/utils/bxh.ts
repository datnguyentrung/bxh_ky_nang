import Papa from 'papaparse';
import type { Bxh } from '../types/bxh';

// Hàm lấy năm sinh từ studentId (format: VQ_xxxxx_DDMMYY)
const extractBirthYear = (studentId: string): number => {
    const parts = studentId.split('_');
    if (parts.length >= 3) {
        const dateStr = parts[2]; // Lấy phần DDMMYY
        const yearStr = dateStr.slice(-2); // Lấy 2 số cuối (YY)
        const year = parseInt(yearStr);
        // Nếu YY > 25 thì là 19YY, ngược lại là 20YY
        return year > 25 ? 1900 + year : 2000 + year;
    }
    return 2000; // Mặc định
};

export const loadBxhData = async (): Promise<Bxh[]> => {
    try {
        const response = await fetch('/data/bxh.csv');
        const csvText = await response.text();

        return new Promise((resolve, reject) => {
            Papa.parse(csvText, {
                header: true,
                skipEmptyLines: true,
                dynamicTyping: true, // Tự động convert string sang number
                complete: (results) => {
                    console.log('Dữ liệu từ CSV:', results.data);
                    const data = (results.data as Bxh[]).map(item => ({
                        ...item,
                        birthYear: extractBirthYear(item.studentId),
                        belt: 'Trắng Vàng' // Mặc định cho bxh.csv
                    }));
                    resolve(data);
                },
                error: (error: Error) => {
                    console.error('Lỗi khi đọc CSV:', error);
                    reject(error);
                }
            });
        });
    } catch (error) {
        console.error('Lỗi khi fetch file CSV:', error);
        throw error;
    }
};

export const loadBxh2Data = async (): Promise<Bxh[]> => {
    try {
        const response = await fetch('/data/bxh2.csv');
        const csvText = await response.text();

        return new Promise((resolve, reject) => {
            Papa.parse(csvText, {
                header: true,
                skipEmptyLines: true,
                dynamicTyping: true,
                complete: (results) => {
                    console.log('Dữ liệu từ CSV bxh2:', results.data);
                    const data = (results.data as Bxh[]).map(item => ({
                        ...item,
                        birthYear: extractBirthYear(item.studentId),
                        belt: 'Xanh Đỏ' // Có thể có cả Trắng Vàng sinh < 2011
                    }));
                    resolve(data);
                },
                error: (error: Error) => {
                    console.error('Lỗi khi đọc CSV:', error);
                    reject(error);
                }
            });
        });
    } catch (error) {
        console.error('Lỗi khi fetch file CSV:', error);
        throw error;
    }
};
