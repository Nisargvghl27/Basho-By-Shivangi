// src/lib/products.js
// Central product data for development. Replace with backend fetch later.

export const products = [
  {
    id: 1,
    name: "Morning Ritual Mug",
    category: "Stoneware • Hand-dipped",
    price: "$32.00",
    priceFormatted: "$32.00",
    inStock: true,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBpIiubKDNOmyXyvkp1GQTFxTw-vcjAPhrFRflWI3xamBf40EpFCCCkTTZdd-Vw-qMaQva74FxjxLgtYPorLjx9-j5FmKrW0EVK2-Wj2LndgQ0JY1cWPm7W1sJ08Z2W7oeRxqimpuXlN1rvXAIn1kqJ0kbKE65Sa6hBq4Wxs88huL8jJIS0NquICBcXNG2WsMTkI87AOSdnhJ-wFLnUAkJjIvh7e8oYxk3mHwr6fhALilmFCq3lHOPwpN9TWtecaVncirBqeQ710-3b",
    images: ["https://lh3.googleusercontent.com/aida-public/AB6AXuBpIiubKDNOmyXyvkp1GQTFxTw-vcjAPhrFRflWI3xamBf40EpFCCCkTTZdd-Vw-qMaQva74FxjxLgtYPorLjx9-j5FmKrW0EVK2-Wj2LndgQ0JY1cWPm7W1sJ08Z2W7oeRxqimpuXlN1rvXAIn1kqJ0kbKE65Sa6hBq4Wxs88huL8jJIS0NquICBcXNG2WsMTkI87AOSdnhJ-wFLnUAkJjIvh7e8oYxk3mHwr6fhALilmFCq3lHOPwpN9TWtecaVncirBqeQ710-3b"],
    colors: ["#442D1C", "#652810", "#8E5022", "#C85428", "#EDD8B4"],
    tags: ["mugs", "tableware", "stoneware"]
  },
  {
    id: 2,
    name: "Ikebana Vase",
    category: "Speckled Clay • Organic Shape",
    price: "$85.00",
    priceFormatted: "$85.00",
    inStock: true,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBtHSu2maI6qNCAGDPGbAE3Y4xVZ59o_ExD-CRjwLGXtkvmV4KyYltw0xxDLOAuhHaKLrkJeUjLuQmOLoarzhmDbngVXWcd7oQP3zPoTch5llhluB7_24SAAz_vhkmS_G1-tBuZ23FOcXz7-dNUaBIJ3B29Zoqp1GueZ0lT36KtAZmexPe5ITXRBfuIToETX7eTw5mEuTfvXNaZC6uqs04EeOU4O83sF9cDmxf-IvNI0JouAl8JkfBhOt9gZENCjDuKKZ-1lktJNMdJ",
    images: ["https://lh3.googleusercontent.com/aida-public/AB6AXuBtHSu2maI6qNCAGDPGbAE3Y4xVZ59o_ExD-CRjwLGXtkvmV4KyYltw0xxDLOAuhHaKLrkJeUjLuQmOLoarzhmDbngVXWcd7oQP3zPoTch5llhluB7_24SAAz_vhkmS_G1-tBuZ23FOcXz7-dNUaBIJ3B29Zoqp1GueZ0lT36KtAZmexPe5ITXRBfuIToETX7eTw5mEuTfvXNaZC6uqs04EeOU4O83sF9cDmxf-IvNI0JouAl8JkfBhOt9gZENCjDuKKZ-1lktJNMdJ","https://lh3.googleusercontent.com/aida-public/AB6AXuBpIiubKDNOmyXyvkp1GQTFxTw-vcjAPhrFRflWI3xamBf40EpFCCCkTTZdd-Vw-qMaQva74FxjxLgtYPorLjx9-j5FmKrW0EVK2-Wj2LndgQ0JY1cWPm7W1sJ08Z2W7oeRxqimpuXlN1rvXAIn1kqJ0kbKE65Sa6hBq4Wxs88huL8jJIS0NquICBcXNG2WsMTkI87AOSdnhJ-wFLnUAkJjIvh7e8oYxk3mHwr6fhALilmFCq3lHOPwpN9TWtecaVncirBqeQ710-3b"],
    colors: ["#442D1C", "#652810", "#8E5022", "#C85428", "#EDD8B4"],
    colorVariants: {
      "#442D1C": [
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBtHSu2maI6qNCAGDPGbAE3Y4xVZ59o_ExD-CRjwLGXtkvmV4KyYltw0xxDLOAuhHaKLrkJeUjLuQmOLoarzhmDbngVXWcd7oQP3zPoTch5llhluB7_24SAAz_vhkmS_G1-tBuZ23FOcXz7-dNUaBIJ3B29Zoqp1GueZ0lT36KtAZmexPe5ITXRBfuIToETX7eTw5mEuTfvXNaZC6uqs04EeOU4O83sF9cDmxf-IvNI0JouAl8JkfBhOt9gZENCjDuKKZ-1lktJNMdJ",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBpIiubKDNOmyXyvkp1GQTFxTw-vcjAPhrFRflWI3xamBf40EpFCCCkTTZdd-Vw-qMaQva74FxjxLgtYPorLjx9-j5FmKrW0EVK2-Wj2LndgQ0JY1cWPm7W1sJ08Z2W7oeRxqimpuXlN1rvXAIn1kqJ0kbKE65Sa6hBq4Wxs88huL8jJIS0NquICBcXNG2WsMTkI87AOSdnhJ-wFLnUAkJjIvh7e8oYxk3mHwr6fhALilmFCq3lHOPwpN9TWtecaVncirBqeQ710-3b",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDWnDEJIEnX4WOsheKZ1kpVvS1wH5Vzzr--DNvfOQ44XMkq1L-h6w9VqIGwRcxHYTqM7F4tYnSFvXABCQJPd8YqTFpb-5-_f6nWTZPXI8wGkTwz_Fo2MGcpEyOAbHybBZ3qTA7cfFKVTHHsAUZShFXMgBHMguG6esgVYsDF74egO5T8cmJvZOQglOfAsjCFqtB6qXsmreLB7B8E2PbDfpkXEA2gMD_0rw99aLS7hPzNR0EXarg-TuWYC-tsiR3xbE4WQIrx4teShG84"
      ],
      "#652810": [
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBpIiubKDNOmyXyvkp1GQTFxTw-vcjAPhrFRflWI3xamBf40EpFCCCkTTZdd-Vw-qMaQva74FxjxLgtYPorLjx9-j5FmKrW0EVK2-Wj2LndgQ0JY1cWPm7W1sJ08Z2W7oeRxqimpuXlN1rvXAIn1kqJ0kbKE65Sa6hBq4Wxs88huL8jJIS0NquICBcXNG2WsMTkI87AOSdnhJ-wFLnUAkJjIvh7e8oYxk3mHwr6fhALilmFCq3lHOPwpN9TWtecaVncirBqeQ710-3b",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDWnDEJIEnX4WOsheKZ1kpVvS1wH5Vzzr--DNvfOQ44XMkq1L-h6w9VqIGwRcxHYTqM7F4tYnSFvXABCQJPd8YqTFpb-5-_f6nWTZPXI8wGkTwz_Fo2MGcpEyOAbHybBZ3qTA7cfFKVTHHsAUZShFXMgBHMguG6esgVYsDF74egO5T8cmJvZOQglOfAsjCFqtB6qXsmreLB7B8E2PbDfpkXEA2gMD_0rw99aLS7hPzNR0EXarg-TuWYC-tsiR3xbE4WQIrx4teShG84",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBPFit41-EvWZZ6xy9vZ37d43IqiUAzgxR3ASW-NKVzi0gbKgg7zvX14nFJW6zhoRjxPBMevfNwsvWvBcl4-i3qRbA0HO9GJl5FT-V3c1ExbOrpFblszgrplrZ7JLI1m0hs19KuHBDgRPLk8L-gjPhhaH1gy99kCCItVv4XRGOu-s-d7DgBj1MuCGMqQnZmxdY-W-Km-3W14m6LnCqQlj5j-TywKWOhvdTTYsfWRyTZqS_lFK-IsKq9PLBE1Ea83QxMpoeODoUGIJHC"
      ],
      "#8E5022": [
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDWnDEJIEnX4WOsheKZ1kpVvS1wH5Vzzr--DNvfOQ44XMkq1L-h6w9VqIGwRcxHYTqM7F4tYnSFvXABCQJPd8YqTFpb-5-_f6nWTZPXI8wGkTwz_Fo2MGcpEyOAbHybBZ3qTA7cfFKVTHHsAUZShFXMgBHMguG6esgVYsDF74egO5T8cmJvZOQglOfAsjCFqtB6qXsmreLB7B8E2PbDfpkXEA2gMD_0rw99aLS7hPzNR0EXarg-TuWYC-tsiR3xbE4WQIrx4teShG84",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBPFit41-EvWZZ6xy9vZ37d43IqiUAzgxR3ASW-NKVzi0gbKgg7zvX14nFJW6zhoRjxPBMevfNwsvWvBcl4-i3qRbA0HO9GJl5FT-V3c1ExbOrpFblszgrplrZ7JLI1m0hs19KuHBDgRPLk8L-gjPhhaH1gy99kCCItVv4XRGOu-s-d7DgBj1MuCGMqQnZmxdY-W-Km-3W14m6LnCqQlj5j-TywKWOhvdTTYsfWRyTZqS_lFK-IsKq9PLBE1Ea83QxMpoeODoUGIJHC",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBuPDqQWBYc0fHxsUDKPMhWbnD4QdWHA7M3PQhRYirw7q0puczUOd0lxSIRUF2fidf1QYY4YcN-TwSPVSTmE3T7tnAwjNqS88jVE6qZ5CRMZYeZBsWN8QZYI-H3FVuaTvoDAA3qkNQ5UajRBYyhfRUa9XyOeZn-TlBdFOtY5i3NVIKXYim7UwTo8xgKZ0m6kdZKNsRQY5zjWeESH-_dMw63d81UbJX-1_n2UF-ydvaWeg7lYTQ9qQYUk9oLkevJ5iGbp1J4GkgWzXAF"
      ],
      "#C85428": [
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBPFit41-EvWZZ6xy9vZ37d43IqiUAzgxR3ASW-NKVzi0gbKgg7zvX14nFJW6zhoRjxPBMevfNwsvWvBcl4-i3qRbA0HO9GJl5FT-V3c1ExbOrpFblszgrplrZ7JLI1m0hs19KuHBDgRPLk8L-gjPhhaH1gy99kCCItVv4XRGOu-s-d7DgBj1MuCGMqQnZmxdY-W-Km-3W14m6LnCqQlj5j-TywKWOhvdTTYsfWRyTZqS_lFK-IsKq9PLBE1Ea83QxMpoeODoUGIJHC",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBuPDqQWBYc0fHxsUDKPMhWbnD4QdWHA7M3PQhRYirw7q0puczUOd0lxSIRUF2fidf1QYY4YcN-TwSPVSTmE3T7tnAwjNqS88jVE6qZ5CRMZYeZBsWN8QZYI-H3FVuaTvoDAA3qkNQ5UajRBYyhfRUa9XyOeZn-TlBdFOtY5i3NVIKXYim7UwTo8xgKZ0m6kdZKNsRQY5zjWeESH-_dMw63d81UbJX-1_n2UF-ydvaWeg7lYTQ9qQYUk9oLkevJ5iGbp1J4GkgWzXAF",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBtHSu2maI6qNCAGDPGbAE3Y4xVZ59o_ExD-CRjwLGXtkvmV4KyYltw0xxDLOAuhHaKLrkJeUjLuQmOLoarzhmDbngVXWcd7oQP3zPoTch5llhluB7_24SAAz_vhkmS_G1-tBuZ23FOcXz7-dNUaBIJ3B29Zoqp1GueZ0lT36KtAZmexPe5ITXRBfuIToETX7eTw5mEuTfvXNaZC6uqs04EeOU4O83sF9cDmxf-IvNI0JouAl8JkfBhOt9gZENCjDuKKZ-1lktJNMdJ"
      ],
      "#EDD8B4": [
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBuPDqQWBYc0fHxsUDKPMhWbnD4QdWHA7M3PQhRYirw7q0puczUOd0lxSIRUF2fidf1QYY4YcN-TwSPVSTmE3T7tnAwjNqS88jVE6qZ5CRMZYeZBsWN8QZYI-H3FVuaTvoDAA3qkNQ5UajRBYyhfRUa9XyOeZn-TlBdFOtY5i3NVIKXYim7UwTo8xgKZ0m6kdZKNsRQY5zjWeESH-_dMw63d81UbJX-1_n2UF-ydvaWeg7lYTQ9qQYUk9oLkevJ5iGbp1J4GkgWzXAF",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBtHSu2maI6qNCAGDPGbAE3Y4xVZ59o_ExD-CRjwLGXtkvmV4KyYltw0xxDLOAuhHaKLrkJeUjLuQmOLoarzhmDbngVXWcd7oQP3zPoTch5llhluB7_24SAAz_vhkmS_G1-tBuZ23FOcXz7-dNUaBIJ3B29Zoqp1GueZ0lT36KtAZmexPe5ITXRBfuIToETX7eTw5mEuTfvXNaZC6uqs04EeOU4O83sF9cDmxf-IvNI0JouAl8JkfBhOt9gZENCjDuKKZ-1lktJNMdJ",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBpIiubKDNOmyXyvkp1GQTFxTw-vcjAPhrFRflWI3xamBf40EpFCCCkTTZdd-Vw-qMaQva74FxjxLgtYPorLjx9-j5FmKrW0EVK2-Wj2LndgQ0JY1cWPm7W1sJ08Z2W7oeRxqimpuXlN1rvXAIn1kqJ0kbKE65Sa6hBq4Wxs88huL8jJIS0NquICBcXNG2WsMTkI87AOSdnhJ-wFLnUAkJjIvh7e8oYxk3mHwr6fhALilmFCq3lHOPwpN9TWtecaVncirBqeQ710-3b"
      ]
    },
    tags: ["vases", "decorative"]
  },
  {
    id: 3,
    name: "Chawan Matcha Bowl",
    category: "Raku Fired • Unique Glaze",
    price: "$55.00",
    priceFormatted: "$55.00",
    inStock: true,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDWnDEJIEnX4WOsheKZ1kpVvS1wH5Vzzr--DNvfOQ44XMkq1L-h6w9VqIGwRcxHYTqM7F4tYnSFvXABCQJPd8YqTFpb-5-_f6nWTZPXI8wGkTwz_Fo2MGcpEyOAbHybBZ3qTA7cfFKVTHHsAUZShFXMgBHMguG6esgVYsDF74egO5T8cmJvZOQglOfAsjCFqtB6qXsmreLB7B8E2PbDfpkXEA2gMD_0rw99aLS7hPzNR0EXarg-TuWYC-tsiR3xbE4WQIrx4teShG84",
    images: ["https://lh3.googleusercontent.com/aida-public/AB6AXuDWnDEJIEnX4WOsheKZ1kpVvS1wH5Vzzr--DNvfOQ44XMkq1L-h6w9VqIGwRcxHYTqM7F4tYnSFvXABCQJPd8YqTFpb-5-_f6nWTZPXI8wGkTwz_Fo2MGcpEyOAbHybBZ3qTA7cfFKVTHHsAUZShFXMgBHMguG6esgVYsDF74egO5T8cmJvZOQglOfAsjCFqtB6qXsmreLB7B8E2PbDfpkXEA2gMD_0rw99aLS7hPzNR0EXarg-TuWYC-tsiR3xbE4WQIrx4teShG84"],
    colors: ["#442D1C", "#652810", "#8E5022", "#C85428", "#EDD8B4"],
    tags: ["bowls", "tableware", "raku"]
  },
  {
    id: 4,
    name: "Incense Burner",
    category: "Black Clay • Minimalist",
    price: "$28.00",
    priceFormatted: "$28.00",
    inStock: true,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBPFit41-EvWZZ6xy9vZ37d43IqiUAzgxR3ASW-NKVzi0gbKgg7zvX14nFJW6zhoRjxPBMevfNwsvWvBcl4-i3qRbA0HO9GJl5FT-V3c1ExbOrpFblszgrplrZ7JLI1m0hs19KuHBDgRPLk8L-gjPhhaH1gy99kCCItVv4XRGOu-s-d7DgBj1MuCGMqQnZmxdY-W-Km-3W14m6LnCqQlj5j-TywKWOhvdTTYsfWRyTZqS_lFK-IsKq9PLBE1Ea83QxMpoeODoUGIJHC",
    images: ["https://lh3.googleusercontent.com/aida-public/AB6AXuBPFit41-EvWZZ6xy9vZ37d43IqiUAzgxR3ASW-NKVzi0gbKgg7zvX14nFJW6zhoRjxPBMevfNwsvWvBcl4-i3qRbA0HO9GJl5FT-V3c1ExbOrpFblszgrplrZ7JLI1m0hs19KuHBDgRPLk8L-gjPhhaH1gy99kCCItVv4XRGOu-s-d7DgBj1MuCGMqQnZmxdY-W-Km-3W14m6LnCqQlj5j-TywKWOhvdTTYsfWRyTZqS_lFK-IsKq9PLBE1Ea83QxMpoeODoUGIJHC"],
    colors: ["#442D1C", "#652810", "#8E5022", "#C85428", "#EDD8B4"],
    tags: ["decorative", "minimalist"]
  },
  {
    id: 5,
    name: "Sake Set",
    category: "Porcelain • Traditional",
    price: "$120.00",
    priceFormatted: "$120.00",
    inStock: true,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBuPDqQWBYc0fHxsUDKPMhWbnD4QdWHA7M3PQhRYirw7q0puczUOd0lxSIRUF2fidf1QYY4YcN-TwSPVSTmE3T7tnAwjNqS88jVE6qZ5CRMZYeZBsWN8QZYI-H3FVuaTvoDAA3qkNQ5UajRBYyhfRUa9XyOeZn-TlBdFOtY5i3NVIKXYim7UwTo8xgKZ0m6kdZKNsRQY5zjWeESH-_dMw63d81UbJX-1_n2UF-ydvaWeg7lYTQ9qQYUk9oLkevJ5iGbp1J4GkgWzXAF",
    images: ["https://lh3.googleusercontent.com/aida-public/AB6AXuBuPDqQWBYc0fHxsUDKPMhWbnD4QdWHA7M3PQhRYirw7q0puczUOd0lxSIRUF2fidf1QYY4YcN-TwSPVSTmE3T7tnAwjNqS88jVE6qZ5CRMZYeZBsWN8QZYI-H3FVuaTvoDAA3qkNQ5UajRBYyhfRUa9XyOeZn-TlBdFOtY5i3NVIKXYim7UwTo8xgKZ0m6kdZKNsRQY5zjWeESH-_dMw63d81UbJX-1_n2UF-ydvaWeg7lYTQ9qQYUk9oLkevJ5iGbp1J4GkgWzXAF"],
    colors: ["#442D1C", "#652810", "#8E5022", "#C85428", "#EDD8B4"],
    tags: ["tableware", "sets"]
  },
  {
    id: 6,
    name: "Tea Ceremony Set",
    category: "Stoneware • Hand-thrown",
    price: "$180.00",
    priceFormatted: "$180.00",
    inStock: true,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBpIiubKDNOmyXyvkp1GQTFxTw-vcjAPhrFRflWI3xamBf40EpFCCCkTTZdd-Vw-qMaQva74FxjxLgtYPorLjx9-j5FmKrW0EVK2-Wj2LndgQ0JY1cWPm7W1sJ08Z2W7oeRxqimpuXlN1rvXAIn1kqJ0kbKE65Sa6hBq4Wxs88huL8jJIS0NquICBcXNG2WsMTkI87AOSdnhJ-wFLnUAkJjIvh7e8oYxk3mHwr6fhALilmFCq3lHOPwpN9TWtecaVncirBqeQ710-3b",
    images: ["https://lh3.googleusercontent.com/aida-public/AB6AXuBpIiubKDNOmyXyvkp1GQTFxTw-vcjAPhrFRflWI3xamBf40EpFCCCkTTZdd-Vw-qMaQva74FxjxLgtYPorLjx9-j5FmKrW0EVK2-Wj2LndgQ0JY1cWPm7W1sJ08Z2W7oeRxqimpuXlN1rvXAIn1kqJ0kbKE65Sa6hBq4Wxs88huL8jJIS0NquICBcXNG2WsMTkI87AOSdnhJ-wFLnUAkJjIvh7e8oYxk3mHwr6fhALilmFCq3lHOPwpN9TWtecaVncirBqeQ710-3b"],
    colors: ["#442D1C", "#652810", "#8E5022", "#C85428", "#EDD8B4"],
    tags: ["sets", "tableware", "stoneware"]
  },
  {
    id: 7,
    name: "Planter Series",
    category: "Terracotta • Organic",
    price: "$45.00",
    priceFormatted: "$45.00",
    inStock: true,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBtHSu2maI6qNCAGDPGbAE3Y4xVZ59o_ExD-CRjwLGXtkvmV4KyYltw0xxDLOAuhHaKLrkJeUjLuQmOLoarzhmDbngVXWcd7oQP3zPoTch5llhluB7_24SAAz_vhkmS_G1-tBuZ23FOcXz7-dNUaBIJ3B29Zoqp1GueZ0lT36KtAZmexPe5ITXRBfuIToETX7eTw5mEuTfvXNaZC6uqs04EeOU4O83sF9cDmxf-IvNI0JouAl8JkfBhOt9gZENCjDuKKZ-1lktJNMdJ",
    images: ["https://lh3.googleusercontent.com/aida-public/AB6AXuBtHSu2maI6qNCAGDPGbAE3Y4xVZ59o_ExD-CRjwLGXtkvmV4KyYltw0xxDLOAuhHaKLrkJeUjLuQmOLoarzhmDbngVXWcd7oQP3zPoTch5llhluB7_24SAAz_vhkmS_G1-tBuZ23FOcXz7-dNUaBIJ3B29Zoqp1GueZ0lT36KtAZmexPe5ITXRBfuIToETX7eTw5mEuTfvXNaZC6uqs04EeOU4O83sF9cDmxf-IvNI0JouAl8JkfBhOt9gZENCjDuKKZ-1lktJNMdJ"],
    colors: ["#442D1C", "#652810", "#8E5022", "#C85428", "#EDD8B4"],
    tags: ["planters", "decorative"]
  },
  {
    id: 8,
    name: "Dinner Plate Set",
    category: "Stoneware • Set of 4",
    price: "$95.00",
    priceFormatted: "$95.00",
    inStock: true,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDWnDEJIEnX4WOsheKZ1kpVvS1wH5Vzzr--DNvfOQ44XMkq1L-h6w9VqIGwRcxHYTqM7F4tYnSFvXABCQJPd8YqTFpb-5-_f6nWTZPXI8wGkTwz_Fo2MGcpEyOAbHybBZ3qTA7cfFKVTHHsAUZShFXMgBHMguG6esgVYsDF74egO5T8cmJvZOQglOfAsjCFqtB6qXsmreLB7B8E2PbDfpkXEA2gMD_0rw99aLS7hPzNR0EXarg-TuWYC-tsiR3xbE4WQIrx4teShG84",
    images: ["https://lh3.googleusercontent.com/aida-public/AB6AXuDWnDEJIEnX4WOsheKZ1kpVvS1wH5Vzzr--DNvfOQ44XMkq1L-h6w9VqIGwRcxHYTqM7F4tYnSFvXABCQJPd8YqTFpb-5-_f6nWTZPXI8wGkTwz_Fo2MGcpEyOAbHybBZ3qTA7cfFKVTHHsAUZShFXMgBHMguG6esgVYsDF74egO5T8cmJvZOQglOfAsjCFqtB6qXsmreLB7B8E2PbDfpkXEA2gMD_0rw99aLS7hPzNR0EXarg-TuWYC-tsiR3xbE4WQIrx4teShG84"],
    colors: ["#442D1C", "#652810", "#8E5022", "#C85428", "#EDD8B4"],
    tags: ["plates", "tableware", "sets"]
  }
];

export async function fetchProducts() {
  // Simulate async fetch - replace with API call later
  return new Promise((resolve) => setTimeout(() => resolve(products), 80));
}

export function getProductById(id) {
  if (id === undefined || id === null) {
    console.log('getProductById: No ID provided');
    return undefined;
  }
  console.log('getProductById: Searching for ID', id, 'Type:', typeof id);
  
  // Convert id to string and trim for comparison
  const idStr = String(id).trim();
  
  // First, try direct string comparison with product.id as string
  let found = products.find((p) => String(p.id) === idStr);
  if (found) {
    console.log('Found product by direct string match:', found);
    return found;
  }
  // Try numeric comparison if the id can be converted to a number
  const num = Number(id);
  if (!Number.isNaN(num)) {
    console.log('Trying numeric match for ID:', num);
    found = products.find((p) => p.id === num);
    if (found) {
      console.log('Found product by numeric match:', found);
      return found;
    }
  }
  // Try matching by slug or normalized name
  const normalize = (s) => String(s).toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
  
  const slug = normalize(idStr);
  console.log('Trying slug match for:', slug);
  
  found = products.find((p) => {
    const productSlug = p.slug ? normalize(p.slug) : normalize(p.name);
    return productSlug === slug;
  });
  if (found) {
    console.log('Found product by slug match:', found);
    return found;
  }
  // Debug: Log all available product IDs for reference
  console.log('Available product IDs:', products.map(p => ({
    id: p.id,
    type: typeof p.id,
    name: p.name
  })));
  console.log(`No product found for id="${idStr}" (num: ${Number.isNaN(num) ? 'NaN' : num}, slug: "${slug}")`);
  return undefined;
}
export async function fetchProductById(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(getProductById(id));
    }, 40);
  });
}
export function searchProducts(term) {
  const normalizedTerm = term.toLowerCase().trim();
  return products.filter(product => 
    product.name.toLowerCase().includes(normalizedTerm) ||
    product.description.toLowerCase().includes(normalizedTerm) ||
    (product.tags && product.tags.some(tag => 
      tag.toLowerCase().includes(normalizedTerm)
    ))
  );
}
export function getProductsByTag(tag) {
  const normalizedTag = tag.toLowerCase().trim();
  return products.filter(product => 
    product.tags && product.tags.some(t => 
      t.toLowerCase() === normalizedTag
    )
  );
}
export function getRelatedProducts(productId, limit = 4) {
  const product = getProductById(productId);
  if (!product || !product.tags) return [];
  
  // Find products with matching tags
  const related = products
    .filter(p => p.id !== product.id && p.tags && p.tags.some(tag => 
      product.tags.includes(tag)
    ))
    .slice(0, limit);
  
  // If not enough related products, fill with other products
  if (related.length < limit) {
    const additional = products
      .filter(p => p.id !== product.id && !related.some(r => r.id === p.id))
      .slice(0, limit - related.length);
    return [...related, ...additional];
  }
  
  return related;
}
export default products;