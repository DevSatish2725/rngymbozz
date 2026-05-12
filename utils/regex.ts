 export const validateIndianPhone = (phone: string) => {
    const regex = /^[6-9]\d{9}$/;
    return regex.test(phone);
  };
  export const allowOnlyNumbers = (value: string) => {
    return value.replace(/\D/g, "");
};
export const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };