using ApiDependencies.DTOs.productDetailsDto;
using backend.data;
using backend.models.reviews;
using Microsoft.EntityFrameworkCore;

namespace ApiDependencies.services.productDetailsServices;

public class ProductReviewsService
{
    private readonly smartexiaContext _smartexiaContext;

    public ProductReviewsService(smartexiaContext smartexiaContext)
    {
        _smartexiaContext = smartexiaContext;
    }
    
    public Task<List<Reviewsdto>> getProductReviews(int productId)
    {
        try
        {
            List<Reviewsdto> reviews = _smartexiaContext.Review.Where(x => x.productId == productId).Include(x=>x.user).Select(x=> new Reviewsdto
                {
                    userName = x.user.name,
                    rating = x.rating.ToString(),
                    comment = x.comment,
                    date = DateTime.Now
                })
                .ToList();
            
            if (!reviews.Any())
            {
                return Task.FromResult(new List<Reviewsdto>());
            }

            return Task.FromResult(reviews);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return null;
        }
    }
}