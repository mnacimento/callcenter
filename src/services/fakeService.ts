import { LoginInterface } from "../interface/login.interface";

export async function fakeLoginService(values: LoginInterface) {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        console.log('Servicio de login simulado con:', values);
        resolve();
      }, 2000);
    });
  }