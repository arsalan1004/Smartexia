using backend.data;
using Microsoft.EntityFrameworkCore;

namespace ApiDependencies.services.productDetailsServices;

public class ProductProtocolService
{
    private readonly smartexiaContext _smartexiaContext;

    public ProductProtocolService(smartexiaContext smartexiaContext)
    {
        _smartexiaContext = smartexiaContext;
    }
    
    public Task<string> getProductProtocol(int productId)
    {
        try
        {
            string protocol = _smartexiaContext.ProductProtocol.Where(x => x.productId == productId).Include(x=>x.protocol).Select(x=>x.protocol.name).FirstOrDefault();
            
            if (protocol == null)
            {
                return null;
            }

            return Task.FromResult(protocol);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return null;
        }
    }
}