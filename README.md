# Flipkart-Web-Scraper

This Project is created To Help Every Single People Who Wants To Use Or Get Products From Flipkart

## Useful Prespective

This Can APi Can help You Creating Like A Flip-kart Clone, Which can Help You Make your Portofolio / Resume / Skills / etc.

## Documentation
### `/search/mobiles` Route
  - What you Need To `Query`
    - a brand name from below (any one)
        - `realme`
        - `mi`
        - `infinix`
        - `apple`
        - `vivo`
        - `asus`
        - `samsung`
        
  - The Url Should Look Like This After The Root `/search/mobiles?company=<brand-you-choosen>`
  - The Brand Should Be In `lowercase` and `it should not contain any space in middle, before and after`

### `/search/random-mobile` Route
  - `Needs`
    - `No Needs`
  - `What does it do ?`
    - It will Give You `Random Mobiles` From Any One Of The `Company` Mentioned in Below.
    
        - `realme`
        - `mi`
        - `infinix`
        - `apple`
        - `vivo`
        - `asus`
        - `samsung` 


  - The Url Should Look Like This After The Root `/search/random-mobile`

### `/product/get-productDetails` Route
  - `Needs`
    - Link To Flipkart Product Page
        
  - `What does it do ?`
    - It will Go to Flipkart Store and find the data for that product like
      - `title`
      - `description`
      - `offer`
      - `preview` (Images)
      - `actualPrice`
      - `off` (like :- 30% Off)
      - `offInCurrency` (Rupee)
      - `price` (including Discount)
      - `rating` (include Camera, Microphone, Averge Rating, 5 star Rating etc)
      - `paymentMethod` (available On Flipkart)
      - `featuresHighLights` (if any)
       

  - The Url Should Look Like This After The Root `/product/<flipkart-url>`

# `Comming Sooon`
