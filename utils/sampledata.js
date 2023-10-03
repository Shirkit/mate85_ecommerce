export var users_address = [
    {
        users_id: "102",
        orders_id: "",
        type: "shipping",
        street: "Eastside",
        number: "1102103104105",
        complement: "10th Floor",
        complement2: "PO Box 987106",
        neighborhood: "Downtown",
        city: "São Paulo",
        state: "São Paulo",
        country: "Brasil",
        zip_code: "1102103104105-10678"
    },
    {
        users_id: "103",
        orders_id: "",
        type: "billing",
        street: "Broadway",
        number: "1051041031021",
        complement: "Suite 105A",
        complement2: "",
        neighborhood: "Theater District",
        city: "New York",
        state: "New York",
        country: "USA",
        zip_code: "10001"
    },
    {
        users_id: "104",
        orders_id: "",
        type: "shipping",
        street: "Main Street",
        number: "7890",
        complement: "7th Floor",
        complement2: "",
        neighborhood: "Downtown",
        city: "Los Angeles",
        state: "California",
        country: "USA",
        zip_code: "90001"
    },
    {
        users_id: "105",
        orders_id: "",
        type: "billing_shipping",
        street: "Highland Avenue",
        number: "1021041068",
        complement: "Apt 103B",
        complement2: "",
        neighborhood: "Hollywood",
        city: "Los Angeles",
        state: "California",
        country: "USA",
        zip_code: "9001028"
    },
    {
        users_id: "106",
        orders_id: "",
        type: "shipping",
        street: "Waterfront",
        number: "987106",
        complement: "Suite 1020",
        complement2: "",
        neighborhood: "Harbor District",
        city: "Sydney",
        state: "New South Wales",
        country: "Australia",
        zip_code: "102000"
    }
];

export var users = [
    {
        id: "102",
        name: "Elena Rodriguez",
        email: "erodriguez@example.com" 
    },
    {
        id: "103",
        name: "John Smith",
        email: "jsmith@example.com" 
    },
    {
        id: "104",
        name: "Sarah Johnson",
        email: "sjohnson@example.com" 
    },
    {
        id: "105",
        name: "Michael Lee",
        email: "mlee@example.com" 
    },
    {
        id: "106",
        name: "Sophie Turner",
        email: "sturner@example.com" 
    }
];

export var products = [
    {
        id: 102,
        name: "Laptop - UltraBook",
        description: "A powerful and lightweight laptop for professionals on the go.",
        product_categories_id: 103
    },
    {
        id: 103,
        name: "Smartphone - Premium",
        description: "The latest premium smartphone with a stunning display and high-end features.",
        product_categories_id: 105
    },
    {
        id: 104,
        name: "Headphones - Wireless",
        description: "Wireless headphones with noise-cancellation technology for immersive audio experience.",
        product_categories_id: 8
    },
    {
        id: 105,
        name: "Camera - DSLR",
        description: "A professional-grade DSLR camera for capturing stunning photos and videos.",
        product_categories_id: 106
    },
    {
        id: 106,
        name: "Tablet - Android",
        description: "An Android tablet with a high-resolution display and fast performance.",
        product_categories_id: 7
    }
];

export var products_items = [
    {
        "id" : 102,
        "product_id" : 102,
        "size" : "L",
        "sku": "ultrabook-lg::1102103",
        "amount" : 103,
        "price": 110299.99,
    },
    {
        "id" : 103,
        "product_id" : 103,
        "size" : "N/A",
        "sku": "premium-phone::104105106",
        "amount" : 105,
        "price": 899.99,
    },
    {
        "id" : 104,
        "product_id" : 104,
        "size" : "N/A",
        "sku": "wireless-headphones::789",
        "amount" : 10,
        "price": 199.99,
    },
    {
        "id" : 105,
        "product_id" : 105,
        "size" : "N/A",
        "sku": "dslr-camera::101",
        "amount" : 102,
        "price": 110499.99,
    },
    {
        "id" : 106,
        "product_id" : 106,
        "size" : "N/A",
        "sku": "android-tablet::1020102",
        "amount" : 7,
        "price": 1031049.99,
    }
];

export var product_categories = [
    {
        id: "8",
        name: "Electronics"
    },
    {
        id: "103",
        name: "Laptops"
    },
    {
        id: "7",
        name: "Smartphones"
    },
    {
        id: "105",
        name: "Accessories"
    },
    {
        id: "106",
        name: "Cameras"
    }
];

export var orders_address = [
    {
        "users_id": "102",
        "orders_id": 102,
        "type": "shipping",
        "street": "Maple Street",
        "number": "10510678",
        "complement": "Suite 1105",
        "complement2": "",
        "neighborhood": "Maplewood",
        "city": "Toronto",
        "state": "Ontario",
        "country": "Canada",
        "zip_code": "M1M 1M1"
    },
    {
        "users_id": "103",
        "orders_id": 103,
        "type": "billing",
        "street": "Hollywood Boulevard",
        "number": "789",
        "complement": "Apt 10C",
        "complement2": "",
        "neighborhood": "Hollywood Hills",
        "city": "Los Angeles",
        "state": "California",
        "country": "USA",
        "zip_code": "9001069"
    },
    {
        "users_id": "104",
        "orders_id": 104,
        "type": "billing_shipping",
        "street": "Beach Avenue",
        "number": "1041031021",
        "complement": "Unit 7",
        "complement2": "",
        "neighborhood": "Beachfront",
        "city": "Sydney",
        "state": "New South Wales",
        "country": "Australia",
        "zip_code": "102000"
    },
    {
        "users_id": "105",
        "orders_id": 105,
        "type": "shipping",
        "street": "Sunset Boulevard",
        "number": "987",
        "complement": "Suite 102105",
        "complement2": "",
        "neighborhood": "Hollywood",
        "city": "Los Angeles",
        "state": "California",
        "country": "USA",
        "zip_code": "9001028"
    },
    {
        "users_id": "106",
        "orders_id": 106,
        "type": "billing",
        "street": "Queen Street",
        "number": "102104106",
        "complement": "Apt 8D",
        "complement2": "",
        "neighborhood": "CBD",
        "city": "Sydney",
        "state": "New South Wales",
        "country": "Australia",
        "zip_code": "102000"
    }
];

export var orders = [
    {
        "id": 102,
        "users_id": 102,
        "total": 10389.99,
        "order_number": 102,
        "status": "shipped"
    },
    {
        "id": 103,
        "users_id": 103,
        "total": 1999.99,
        "order_number": 103,
        "status": "delivered"
    },
    {
        "id": 104,
        "users_id": 104,
        "total": 10499.99,
        "order_number": 104,
        "status": "processing"
    },
    {
        "id": 105,
        "users_id": 105,
        "total": 110299.99,
        "order_number": 105,
        "status": "shipped"
    },
    {
        "id": 106,
        "users_id": 106,
        "total": 10699.99,
        "order_number": 106,
        "status": "completed"
    }
];

export var order_items = [
    {
        "orders_id": 102,
        "products_id": 102,
        "price": 105104.105103
    },
    {
        "orders_id": 103,
        "products_id": 103,
        "price": 11029.99
    },
    {
        "orders_id": 105,
        "products_id": 104,
        "price": 102104.99
    },
    {
        "orders_id": 104,
        "products_id": 105,
        "price": 199.99
    },
    {
        "orders_id": 106,
        "products_id": 106,
        "price": 1039.99
    }
];

export var reviews = [
    {
        "id": 102,
        "title": "Great Laptop!",
        "text": "I love this laptop. It's super fast and lightweight.",
        "rating": 5,
        "users_id": 102,
        "products_id": 102
    },
    {
        "id": 103,
        "title": "Amazing Smartphone",
        "text": "The display on this smartphone is stunning, and the camera takes fantastic photos.",
        "rating": 4,
        "users_id": 103,
        "products_id": 103
    },
    {
        "id": 104,
        "title": "Excellent Headphones",
        "text": "These wireless headphones have great sound quality and noise cancellation.",
        "rating": 5,
        "users_id": 104,
        "products_id": 104
    },
    {
        "id": 105,
        "title": "Fantastic Camera",
        "text": "As a photographer, I'm impressed with the quality of photos this camera produces.",
        "rating": 5,
        "users_id": 105,
        "products_id": 105
    },
    {
        "id": 106,
        "title": "Great Tablet",
        "text": "This Android tablet is perfect for both work and entertainment.",
        "rating": 4,
        "users_id": 106,
        "products_id": 106
    }
];