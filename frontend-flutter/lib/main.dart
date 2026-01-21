import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: const PlaceOrderScreen(),
      theme: ThemeData(
        primarySwatch: Colors.blue
      ),
      title: 'Inventory Allocation'
    );
  }
}

class PlaceOrderScreen extends StatefulWidget {
  const PlaceOrderScreen({super.key});

  @override
  State<PlaceOrderScreen> createState() => _PlaceOrderScreenState();
}

class _PlaceOrderScreenState extends State<PlaceOrderScreen> {
  final TextEditingController _productIdController = TextEditingController();
  final TextEditingController _quantityController = TextEditingController();
  String _message = '';

  Future<void> _placeOrder() async {
    try {
      final productId = int.tryParse(_productIdController.text);
      final quantity = int.tryParse(_quantityController.text);

      if (productId == null || quantity == null) {
        setState(() {
          _message = 'Please enter valid numbers.';
        });
        return;
      }

      final response = await http.post(
        Uri.parse('http://localhost:3000/api/order'),
        body: jsonEncode({
          'productId': productId,
          'quantity': quantity
        }),
        headers: {'Content-Type': 'application/json'}
      );

      final data = jsonDecode(response.body);

      setState(() {
        if (response.statusCode == 201) {
          _message = 'Order placed successfully.';
        } else {
          _message = data['message'] ?? 'Failed to place order.';
        }
      });
    } catch (e) {
      setState(() {
        _message = 'Server error. Please check if the backend is running.';
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Place Order')
      ),
      body: Padding(
        padding: const EdgeInsets.all(40.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'Place Order',
              style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold)
            ),
            const SizedBox(height: 20),
            TextField(
              controller: _productIdController,
              decoration: const InputDecoration(
                border: OutlineInputBorder(),
                hintText: 'Enter product ID',
                labelText: 'Product ID'
              ),
              keyboardType: TextInputType.number
            ),
            const SizedBox(height: 20),
            TextField(
              controller: _quantityController,
              decoration: const InputDecoration(
                border: OutlineInputBorder(),
                hintText: 'Enter quantity',
                labelText: 'Quantity'
              ),
              keyboardType: TextInputType.number
            ),
            const SizedBox(height: 20),
            ElevatedButton(
              onPressed: _placeOrder,
              child: const Text('Submit')
            ),
            const SizedBox(height: 20),
            Text(
              _message,
              style: TextStyle(
                color: _message.contains('successfully') ? Colors.green : Colors.red,
                fontSize: 16
              )
            )
          ]
        )
      )
    );
  }

  @override
  void dispose() {
    _productIdController.dispose();
    _quantityController.dispose();
    super.dispose();
  }
}
