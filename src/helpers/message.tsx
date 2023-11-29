import { AxiosError } from 'axios';
import Swal from 'sweetalert2';

export const handleError = (error: AxiosError): void => {
  const errorData: string = error.response?.data as string;
  switch (error.response?.status) {
    case 404:
      notFound(errorData);
      break;
  }
};

const notFound = (data: string): void => {
  console.log(data);
  Swal.fire({
    title: 'Usuario incorrecto',
    text: 'El usuario o contraseña no existe',
    icon: 'warning',
  });
};

interface Question {
  title: string;
  text: string;
}

export const question = async ({ title, text }: Question): Promise<boolean> => {
  return new Promise((resolve) => {
    Swal.fire({
      title,
      text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, aceptar!',
      cancelButtonText: 'No, cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
};

export const success = (message: string): void => {
  Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: message,
    showConfirmButton: false,
    timer: 1500,
  });
};
