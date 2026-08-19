import {useState} from "react";
import { login } from "../data/auth/auth.service";

export function useLogin(){
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
    
}