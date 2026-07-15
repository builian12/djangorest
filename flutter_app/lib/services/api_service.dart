import 'dart:async';
import 'dart:convert';
import 'dart:io';
import 'package:http/http.dart' as http;

class ApiService {
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
        '1. Que el servidor Django esté corriendo\n'
        '2. Que la IP $baseUrl sea correcta\n'
        '3. Que estés en la misma red WiFi',
      );
    } on http.ClientException {
      throw Exception(
        'No se pudo conectar al servidor.\n'
        'Verifica que el backend esté activo.',
      );
    } on TimeoutException {
      throw Exception(
        'Tiempo de espera agotado.\n'
        'El servidor no responde. Asegúrate de que:\n'
        '- El backend esté corriendo en $baseUrl\n'
        '- Estés en la misma red WiFi',
      );
    } catch (e) {
      rethrow;
    }
  }
}