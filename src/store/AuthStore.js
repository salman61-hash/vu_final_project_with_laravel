// import api from "@/Api";
import axios from "axios";
import { defineStore } from "pinia";
import api from './../Api';

export const useAuthStore = defineStore('auth', {
    state: () => ({
      token: localStorage.getItem('token') || null,
      user: null,
    }),
    actions: {
      async login(credentials) {
        try {
          const res = await api.post('/login', credentials);
          this.token = res.data.authorisation.token;
          this.user = res.data.user;
          localStorage.setItem('token', this.token);
          api.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
        } 
        catch (err) {
          console.error("Login failed:", err.response?.data?.message || err.message);
          throw err;  // Let the UI handle it.
        }
      
      
      },
      logout() {
        api.post()
        .then((result) => {
  
          console.log(result.data);
          this.token = null;
          this.user = null;
          localStorage.removeItem('token');
          delete api.defaults.headers.common['Authorization'];
        }).catch((err) => {
          
        });
        
      },
      initAuth() {
        if (this.token) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
        }
      }
    },
  });