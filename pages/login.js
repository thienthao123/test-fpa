import Head from 'next/head'
import Link from 'next/link'
export default () => 
<html>

<Head>

    <meta charSet="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <title>INSPINIA | Login</title>

    <link href="/static/css/bootstrap.min.css" rel="stylesheet" />
    <link href="/static/font-awesome/css/font-awesome.css" rel="stylesheet" />
    <link href="/static/css/plugins/bootstrapSocial/bootstrap-social.css" rel="stylesheet" />

    <link href="/static/css/animate.css" rel="stylesheet" />
    <link href="/static/css/style.css" rel="stylesheet" />

</Head>

<body class="gray-bg">

    <div class="middle-box text-center loginscreen animated fadeInDown">
        <div>
            <h3>Welcome to PageHub</h3>
            <p>Perfectly designed and precisely prepared admin theme with over 50 pages with extra new web app views.
            </p>
            <p>Login in. To see it in action.</p>
            <form class="m-t" role="form" action="index.html">
                <div class="form-group">
                    <input type="email" class="form-control" placeholder="Username" required="" />
                </div>
                <div class="form-group">
                    <input type="password" class="form-control" placeholder="Password" required="" />
                </div>
                <button type="submit" class="btn btn-primary block full-width m-b">Login</button>
                <a href="/auth/facebook/login" class="btn btn-block btn-social btn-facebook">
                            <span class="fa fa-facebook"></span> Sign in with Facebook
                </a>
                <a href="/auth/forgot"><small>Forgot password?</small></a>
            </form>
        </div>
    </div>

    <script src="/static/js/jquery-3.1.1.min.js"></script>
    <script src="/static/js/bootstrap.min.js"></script>

</body>

</html>