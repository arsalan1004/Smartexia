using ApiDependencies.authentication;
using ApiDependencies.filters.authFiler;
using Firebase.Auth;
using Firebase.Auth.Providers;
using FirebaseAdmin;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace ApiDependencies
{

    public static class DependencyExtensionMethods
    {
        public static IServiceCollection AddApiDependencies(this IServiceCollection service)
        {
            service.AddSessionServices();
            service.AddFirebaseServices();
            service.AddAuthenticationServices();
            return service;
        }

        private static IServiceCollection AddSessionServices(this IServiceCollection service)
        {
            service.AddDistributedMemoryCache(); // Example registration for DistributedMemoryCache
            service.AddSession();
            return service;
        }

        private static IServiceCollection AddFirebaseServices(this IServiceCollection service)
        {
            service.AddSingleton(FirebaseApp.Create());
            service.AddSingleton<FirebaseAuthClient>();
            service.AddSingleton<FirebaseAuthConfig>();
            service.AddSingleton<Authentication>();

            service.AddSingleton(new FirebaseAuthClient(new FirebaseAuthConfig
            {
                ApiKey = "AIzaSyD0y1GPU1ZHGU0YwXE0nyOzbQZObpyvkaA",
                AuthDomain = $"smartexia.firebaseapp.com",
                Providers = new FirebaseAuthProvider[]
                {
                    new EmailProvider(),
                    new GoogleProvider()
                }
            }));
            service.AddSingleton<IAuthentication, Authentication>(); 
            
            return service;
        }

        private static IServiceCollection AddAuthenticationServices(this IServiceCollection service)
        {
            service.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.Authority = $"https://securetoken.google.com/smartexia";
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidIssuer = $"https://securetoken.google.com/smartexia",
                        ValidateAudience = true,
                        ValidAudience = "smartexia",
                        ValidateLifetime = true
                    };
                });
            service.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            return service;
        }
        private static IServiceCollection AddFilterServices(this IServiceCollection service)
        {
            service.AddScoped<TokenAuthenticationFilter>();
            return service;
        }
    }
}