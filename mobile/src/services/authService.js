import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import config from '../../config';

const TOKEN_KEY = 'elite_estilo_token';
const USER_KEY = 'elite_estilo_user';

// Classe para gerenciar autenticação
class AuthService {
  constructor() {
    this.token = null;
    this.user = null;
  }

  // Salvar token de forma segura
  async saveToken(token) {
    try {
      await SecureStore.setItemAsync(TOKEN_KEY, token);
      this.token = token;
      return true;
    } catch (error) {
      console.error('Erro ao salvar token:', error);
      return false;
    }
  }

  // Recuperar token
  async getToken() {
    if (this.token) {
      return this.token;
    }
    
    try {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      this.token = token;
      return token;
    } catch (error) {
      console.error('Erro ao recuperar token:', error);
      return null;
    }
  }

  // Salvar dados do usuário
  async saveUser(user) {
    try {
      await SecureStore.setItemAsync(USER_KEY, JSON.stringify(user));
      this.user = user;
      return true;
    } catch (error) {
      console.error('Erro ao salvar usuário:', error);
      return false;
    }
  }

  // Recuperar dados do usuário
  async getUser() {
    if (this.user) {
      return this.user;
    }
    
    try {
      const userJson = await SecureStore.getItemAsync(USER_KEY);
      if (userJson) {
        this.user = JSON.parse(userJson);
        return this.user;
      }
      return null;
    } catch (error) {
      console.error('Erro ao recuperar usuário:', error);
      return null;
    }
  }

  // Limpar dados de autenticação
  async clearAuth() {
    try {
      await SecureStore.deleteItemAsync(TOKEN_KEY);
      await SecureStore.deleteItemAsync(USER_KEY);
      this.token = null;
      this.user = null;
      return true;
    } catch (error) {
      console.error('Erro ao limpar autenticação:', error);
      return false;
    }
  }

  // Login
  async login(email, password) {
    try {
      const response = await axios.post(config.AUTH_ENDPOINTS.LOGIN, {
        email,
        password,
      });

      const { token, user } = response.data;

      // Salvar token e usuário
      await this.saveToken(token);
      await this.saveUser(user);

      return {
        success: true,
        user,
        token,
      };
    } catch (error) {
      console.error('Erro no login:', error);
      
      if (error.response) {
        return {
          success: false,
          error: error.response.data.error || 'Erro ao fazer login',
        };
      }
      
      return {
        success: false,
        error: 'Erro de conexão. Verifique sua internet.',
      };
    }
  }

  // Registro
  async register(name, email, password, phone = '') {
    try {
      const response = await axios.post(config.AUTH_ENDPOINTS.REGISTER, {
        name,
        email,
        password,
        phone,
      });

      const { token, user } = response.data;

      // Salvar token e usuário
      await this.saveToken(token);
      await this.saveUser(user);

      return {
        success: true,
        user,
        token,
      };
    } catch (error) {
      console.error('Erro no registro:', error);
      
      if (error.response) {
        return {
          success: false,
          error: error.response.data.error || 'Erro ao criar conta',
        };
      }
      
      return {
        success: false,
        error: 'Erro de conexão. Verifique sua internet.',
      };
    }
  }

  // Verificar se o token é válido
  async verifyToken() {
    try {
      const token = await this.getToken();
      
      if (!token) {
        return { valid: false };
      }

      const response = await axios.get(config.AUTH_ENDPOINTS.VERIFY, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return {
        valid: true,
        user: response.data.user,
      };
    } catch (error) {
      console.error('Erro ao verificar token:', error);
      return { valid: false };
    }
  }

  // Obter perfil do usuário
  async getProfile() {
    try {
      const token = await this.getToken();
      
      if (!token) {
        return { success: false, error: 'Usuário não autenticado' };
      }

      const response = await axios.get(config.AUTH_ENDPOINTS.PROFILE, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      await this.saveUser(response.data);

      return {
        success: true,
        user: response.data,
      };
    } catch (error) {
      console.error('Erro ao obter perfil:', error);
      
      if (error.response && error.response.status === 401) {
        await this.clearAuth();
      }
      
      return {
        success: false,
        error: 'Erro ao obter perfil do usuário',
      };
    }
  }

  // Logout
  async logout() {
    return await this.clearAuth();
  }

  // Verificar se o usuário está autenticado
  async isAuthenticated() {
    const token = await this.getToken();
    return !!token;
  }
}

// Exportar instância singleton
export default new AuthService();
