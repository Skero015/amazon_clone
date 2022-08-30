
import 'package:amazon_clone/constants/error_handling.dart';
import 'package:amazon_clone/constants/global%20variables.dart';
import 'package:amazon_clone/constants/utils.dart';
import 'package:amazon_clone/models/user.dart';
import 'package:flutter/cupertino.dart';
import 'package:http/http.dart' as http;
class AuthService {

  //sign up user
  void signUpUser({required BuildContext context, required String name, required String email, required String password}) async {

    try{

      User user = User(id: '', name: name, password: password, email: email, address: '', type: '', token: '');
      
      http.Response res = await http.post(
          Uri.parse('$uri/api/signup'),
          body: user.toJson(),
          headers: <String, String>{
            'Content-Type': 'application/json; charset=UTF-8',
          },
      );

      httpErrorHandle(
          response: res,
          context: context,
          onSuccess: () {
            showSnackBar(context, "Account created! Login with the same credentials");
          }
      );

    }catch(e) {
      showSnackBar(context, e.toString());
    }

  }

  //sign in user
}