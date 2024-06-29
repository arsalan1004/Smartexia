using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace ApiDependencies.filters.authFiler;

public class TokenAuthenticationFilter:IActionFilter
{
    private readonly IHttpContextAccessor _httpContextAccessor;
    
    public TokenAuthenticationFilter(IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
    }
    
    public void OnActionExecuting(ActionExecutingContext context)
    { 
        var token = _httpContextAccessor.HttpContext?.Session.GetString("token");
        if (token is null)
        {
            context.Result = new UnauthorizedResult();
        }
    }

    public void OnActionExecuted(ActionExecutedContext context)
    {
        
    }
}