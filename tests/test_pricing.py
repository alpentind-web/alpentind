from app.services.pricing import PricingService

def test_break_even():
    assert round(PricingService().break_even(2730,1890,770),2)==2.44
