import axios from "axios";

export const config = (user) => {
  if (user.token) {
    return {
      headers: {
        Authorization: user.token,
      },
    };
  }
  return {};
};

export async function loginUserService({ email, password }) {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/login`,
      {
        email,
        password,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export async function registerUserService(formData) {
  const { nombre, email, password, confirmPassword } = formData;

  // Verificar si las contraseñas coinciden
  if (password !== confirmPassword) {
    throw new Error("Las contraseñas no coinciden");
  }

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/usuario`,
      {
        nombre,
        email,
        password,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export async function modifyUserService(id, formData, user) {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/usuario/${id}`,
      formData,
      config(user)
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export async function deleteUserService(id, user) {
  const response = await axios.delete(
    `${import.meta.env.VITE_BACKEND_URL}/usuario/${id}`,
    config(user)
  );
  return response.data;
}
