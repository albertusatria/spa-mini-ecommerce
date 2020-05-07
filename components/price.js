export default function Price({priceRange}) {    
    const regularPrice = priceRange.minimum_price.regular_price;
    const finalPrice = priceRange.minimum_price.final_price;
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    });
    return (
        <div className={"price-box " + (regularPrice.value != finalPrice.value ? "special-price":null)}>
            {
                regularPrice.value != finalPrice.value ?
                    <div className="price-regular_price">
                        <span><span>
                            {formatter.format(regularPrice.value)}
                        </span></span>
                    </div>
                :null
             }
            <div className="price-final_price">
                <span><span>
                    {formatter.format(finalPrice.value)}
                </span></span>
            </div>
        </div>
    )
}
