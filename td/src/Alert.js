
import Swal from 'sweetalert2'

export const successalert = (message) => {
  const alert =   Swal.fire({
        position: "top-center",
        icon: "success",
        title: message,
        showConfirmButton: false,
        timer: 3000
      });

      return alert
}


export const erroralert = (message) => {
    const alert = Swal.fire({
        position: "top-center",
        icon: "error",
        title: message,
        showConfirmButton: false,
        timer: 3000
      });

      return alert
}





