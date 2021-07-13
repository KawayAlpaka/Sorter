
const light = document.createElement("link");
light.rel = "stylesheet";
light.href = "/style/antd.css";

export type Theme = "dark" | "light"

const currentTheme = ()=>{
  if(light.parentElement){
    return "light";
  }else{
    return "dark"
  }
}

export const setTheme = (theme:Theme)=>{
  const current = currentTheme();
  if(current !== theme){
    if(light.parentElement){
      light.parentElement.removeChild(light);
    }else{
      document.body.appendChild(light);
    }
  }
}
