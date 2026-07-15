import 'package:flutter/material.dart';
import 'package:flutter_app/pages/login_page.dart';

class LoginPage extends StatefulWidget {
  const LoginPage({super.key});

  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
    final TextEdittingController _usernameController = TextEditingController();
    final TextEdittingController _passwordController = TextEditingController();
    final ApiService _apiService = ApiService();
    bool _isLoading = false;
    Future<void> IniciarSesion() async {
        if(usernameController.text.isEmpty || passwordController.text.isEmpty) {
            scaffoldMessenger.of(context).showSnackBar(
                const SnackBar(content: Text('Por favor ingrese usuario y contraseña')));
                return;
        }
        setState(() {
            isLoading = true;
        });
        try {
            final respuesta = await apiService.login(usernameController.text, passwordController.text);
            print(respuesta);
            ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(content: Text('Inicio exitoso')
                ),
            );
            //aqui se redirecciona al dashboard o menu
        }catch(e){
            scaffoldMessenger.of(context).showSnackBar(
                const SnackBar(content: Text(e.toString())
                ),
            );
        }finally{
            setState(() {
                isLoading = false;
            });
        }
        @override
        Widget build(BuildContext context){
            return scaffold(
                appBar: AppBar (
                    title: const Text('Login')
                    centerTitle: true,
                ),
                body: Center(
                    child: SingleChildScrollView(
                        padding: const edgeInsets.all(20),
                        child: Column(
                            children: [
                                const Icon(
                                    Icons.person, 
                                    size: 100,
                                ),
                                const SizedBox(height: 30),
                                TextField(
                                    controller: usernameController,
                                    decoration: const InputDecoration(
                                        labelText: 'Usuario',
                                        border: OutlineInputBorder(),
                                        prefixIcon: Icon(Icons.person),
                                    ),
                                ),
                                const SizedBox(height: 30),
                                TextField(
                                    controller: passwordController,
                                    decoration: const InputDecoration(
                                        labelText: 'Contraseña',
                                        border: OutlineInputBorder(),
                                        prefixIcon: Icon(Icons.lock),
                                    ),
                                ),
                                const SizedBox(height: 30),
                                sizedBox(
                                    width: double.infinity,
                                    height: 50,
                                    child: ElevatedButton(
                                        onPressed: isLoading ? null : IniciarSesion,
                                        child: isLoading 
                                            ? const CircularProgressIndicator(
                                                valueColor: AlwaysStoppedAnimation<Color>(Colors.white),
                                            )
                                            : const Text('Iniciar Sesion', 
                                            style: TextStyle(fontSize: 18),
                                            ),
                                    ),
                                ),
                            
                            ],
                        ),
                    ),

                ),
            )
        }
    }