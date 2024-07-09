Capsule Wardrobe page

A capsule wardrobe is a small wardrobe where all the clothes go with everything. This is a React / Typescript page where capsule wardrobe enjoyers will be able to save pictures of their clothes and generate random outfits. Criteria like formality, season, and color can be applied on the outfits. The users will also be able to save their favorite outfits. Currently, the page is functional but data can't be saved permanently because it's only a front-end. There are some placeholder images for testing purposes.

Some components:

src/components/MainPage.tsx: The main page, shows the user's clothing collection.

src/components/FormComponents.tsx: Form components, including a custom color picker.

src/components/SavedOutfits.tsx: Shows the saved outfits. You can also record how many times you've worn each outfit.

src/components/GenerateOutfits.tsx: Generate and save outfits.

src/utils/outfitsRandomizer.tsx: The outfit randomizer function.