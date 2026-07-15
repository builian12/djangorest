import 'dart:async';
import 'dart:convert';
import 'dart:io';
import 'package:http/http.dart' as http;

class ApiService {
  // IP de la PC en la red - debe ser accesible desde el celular
  // Para Windows usar 10.0.2.2 (emulador) o localhost
  final String baseUrl = 'http://172.16.117.148:8000/api';

  Future<Map<String, dynamic>> login(String username, String password) async {
    try {
      final response = await http
          .post(
            Uri.parse('$baseUrl/login/'),
            headers: {
              'Content-Type': 'application/json',
            },
            body: json.encode({
              'username': username,
              'password': password,
            }),
          )
          .timeout(const Duration(seconds: 10));

      if (response.statusCode == 200) {
        return json.decode(response.body);
      } else if (response.statusCode == 401) {
        throw Exception('Usuario o contraseña incorrectos');
      } else {
        throw Exception('Error del servidor (${response.statusCode})');
      }
    } on SocketException {
      throw Exception(
        'No se pudo conectar al servidor.\n'
        'Verifica:\n'
        '1. Que el backend este corriendo\n'
        '2. IP: 172.16.117.148:8000\n'
        '3. Misma red WiFi entre PC y celular',
      );
    } on http.ClientException {
      throw Exception(
        'No se pudo conectar al servidor.\n'
        'Verifica que el backend este activo.',
      );
    } on TimeoutException {
      throw Exception(
        'Tiempo de espera agotado.\n'
        'El servidor no responde.',
      );
    } catch (e) {
      rethrow;
    }
  }
}