import axios from "axios";
import swal from "sweetalert";
import { constants } from "../Helpers/constantsFile";

export const deleteFunction = (title, name, url, fun, removeInstance) => {
    swal({
      title: title,
      text: `Are you sure to delete ${name}?`,
      icon: "warning",
      buttons: {
        cancel : 'No',
        confirm : {text:'Yes',className:'sweet-warning'},
    }

    }).then((response) => {
      if (response) {
        axios.delete(url, {
          headers: {
            'authorization': constants.token
           },
        }).then(()=> {
          swal({text: `You have successfully deleted ${name}`,
          icon:"success", timer: "2000"})
          fun()
          removeInstance()
        }).catch((err) => {
          swal({text: err.response?.data?.message,
      icon:"error", timer: "2000"})
        })
        
      }
    })
  }