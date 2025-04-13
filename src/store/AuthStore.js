import api from "@/Api";
import axios from "axios";
import { defineStore } from "pinia";

export const useAuthStore = defineStore('auth', {
    state: () => ({
      token: localStorage.getItem('token') || null,
      user: null,
    }),
    actions: {
      async login(credentials) {
        try {
          const res = await api.post('/login', credentials);
          // console.log(credentials);
          // console.log(res);
           console.log("token",res.data.authorisation.token);
          
          this.token = res.data.authorisation.token;
          this.user = res.data.user;
  
          // Save token in localStorage
          localStorage.setItem('token', this.token);
  
          // Set token for future requests
          api.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
        } catch (err) {
          throw err;
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