export const toastData = {
    success: {
      toast: true, position: 'center', background: "#1b9b46", color: "white", showConfirmButton: false, timer: 2000, width: 450, padding: ".5rem"
    },
    error: {
      toast: true, position: 'center', background: "red", color: "white", showConfirmButton: false, timer: 2000, width: 450, padding: ".5rem"
    },
    info: {
      toast: true, position: 'center', background: "gray", color: "white", showConfirmButton: false, timer: 2000, width: 450, padding: ".5rem"
    },
  
    warn: {
      toast: true, position: 'center', background: "#DD7A01", color: "white", showConfirmButton: false, timer: 2000, width: 450, padding: ".5rem"
    },
  
    confirm: {
      title: "Are you sure?",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }
    
  }
  export const icon = {
    success: { icon: 'success', iconColor: "white",title: "error" },
    error: { icon: 'error', iconColor: "white",title: "error" },
    info: {icon:'info', iconColor: "white",title: "error"},
    warn: { icon: 'warning', iconColor: "white",title: "error" },
    confirm: { title: "Deleted!",
    text: "",
    icon: "success"}
  
  }


  
  
  