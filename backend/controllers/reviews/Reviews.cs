using ApiDependencies.DTOs.reviewsDto;
using ApiDependencies.filters.authFiler;
using backend.data;
using backend.models.reviews;
using Microsoft.AspNetCore.Mvc;

namespace backend.controllers.reviews;

[ApiController]
public class Reviews: Controller
{

    private readonly smartexiaContext _smartexiaContext;
    
    public Reviews(smartexiaContext smartexiaContext)
    {
        _smartexiaContext = smartexiaContext;
    }
    
    [HttpPost]
    [Route("reviews/add")]
    //[ServiceFilter(typeof(TokenAuthenticationFilter))]
    public async Task<IActionResult> AddReview([FromBody] AddReviewdto review)
    {
        try
        {
            Review productReview = new Review
            {
                rating = review.rating,
                comment = review.comment,
                userId = review.userId,
                productId = review.productId
            }; 
            await _smartexiaContext.Review.AddAsync(productReview);
            await _smartexiaContext.SaveChangesAsync();
            return Ok(productReview);
        }
        catch (Exception e)
        {
            return StatusCode(500, e.Message);
        }
    }

}