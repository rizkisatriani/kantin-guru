/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */
 
 import { createWebHistory, createRouter } from "vue-router";
 
 
import HelloWorld from './components/HelloWorld.vue';  
 
 
const routes =  [{
    path : '/',
    name : 'Form',
    component : HelloWorld
    },  ] ;
    const router = createRouter({
        history: createWebHistory(),
        routes,
      });
      export default router;
