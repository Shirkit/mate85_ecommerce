export var users_address = [
    {
        users_id: "2",
        orders_id: "",
        type: "shipping",
        street: "Eastside",
        number: "12345",
        complement: "10th Floor",
        complement2: "PO Box 9876",
        neighborhood: "Downtown",
        city: "São Paulo",
        state: "São Paulo",
        country: "Brasil",
        zip_code: "12345-678"
    },
    {
        users_id: "3",
        orders_id: "",
        type: "billing",
        street: "Broadway",
        number: "54321",
        complement: "Suite 5A",
        complement2: "",
        neighborhood: "Theater District",
        city: "New York",
        state: "New York",
        country: "USA",
        zip_code: "10001"
    },
    {
        users_id: "4",
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
        users_id: "5",
        orders_id: "",
        type: "billing_shipping",
        street: "Highland Avenue",
        number: "2468",
        complement: "Apt 3B",
        complement2: "",
        neighborhood: "Hollywood",
        city: "Los Angeles",
        state: "California",
        country: "USA",
        zip_code: "90028"
    },
    {
        users_id: "6",
        orders_id: "",
        type: "shipping",
        street: "Waterfront",
        number: "9876",
        complement: "Suite 20",
        complement2: "",
        neighborhood: "Harbor District",
        city: "Sydney",
        state: "New South Wales",
        country: "Australia",
        zip_code: "2000"
    }
];

export var users = [
    {
        id: "2",
        name: "Elena Rodriguez",
        email: "erodriguez@example.com" 
    },
    {
        id: "3",
        name: "John Smith",
        email: "jsmith@example.com" 
    },
    {
        id: "4",
        name: "Sarah Johnson",
        email: "sjohnson@example.com" 
    },
    {
        id: "5",
        name: "Michael Lee",
        email: "mlee@example.com" 
    },
    {
        id: "6",
        name: "Sophie Turner",
        email: "sturner@example.com" 
    }
];

export var products = [
    {
        id: 2,
        name: "Laptop - UltraBook",
        description: "A powerful and lightweight laptop for professionals on the go.",
        product_categories_id: 3
    },
    {
        id: 3,
        name: "Smartphone - Premium",
        description: "The latest premium smartphone with a stunning display and high-end features.",
        product_categories_id: 5
    },
    {
        id: 4,
        name: "Headphones - Wireless",
        description: "Wireless headphones with noise-cancellation technology for immersive audio experience.",
        product_categories_id: 8
    },
    {
        id: 5,
        name: "Camera - DSLR",
        description: "A professional-grade DSLR camera for capturing stunning photos and videos.",
        product_categories_id: 6
    },
    {
        id: 6,
        name: "Tablet - Android",
        description: "An Android tablet with a high-resolution display and fast performance.",
        product_categories_id: 7
    }
];

export var products_items = [
    {
        "id" : 2,
        "product_id" : 2,
        "size" : "L",
        "sku": "ultrabook-lg::123",
        "amount" : 3,
        "price": 1299.99,
    },
    {
        "id" : 3,
        "product_id" : 3,
        "size" : "N/A",
        "sku": "premium-phone::456",
        "amount" : 5,
        "price": 899.99,
    },
    {
        "id" : 4,
        "product_id" : 4,
        "size" : "N/A",
        "sku": "wireless-headphones::789",
        "amount" : 10,
        "price": 199.99,
    },
    {
        "id" : 5,
        "product_id" : 5,
        "size" : "N/A",
        "sku": "dslr-camera::101",
        "amount" : 2,
        "price": 1499.99,
    },
    {
        "id" : 6,
        "product_id" : 6,
        "size" : "N/A",
        "sku": "android-tablet::202",
        "amount" : 7,
        "price": 349.99,
    }
];

export var product_categories = [
    {
        id: "8",
        name: "Electronics"
    },
    {
        id: "3",
        name: "Laptops"
    },
    {
        id: "7",
        name: "Smartphones"
    },
    {
        id: "5",
        name: "Accessories"
    },
    {
        id: "6",
        name: "Cameras"
    }
];

export var orders_address = [
    {
        "users_id": "2",
        "orders_id": 2,
        "type": "shipping",
        "street": "Maple Street",
        "number": "5678",
        "complement": "Suite 15",
        "complement2": "",
        "neighborhood": "Maplewood",
        "city": "Toronto",
        "state": "Ontario",
        "country": "Canada",
        "zip_code": "M1M 1M1"
    },
    {
        "users_id": "3",
        "orders_id": 3,
        "type": "billing",
        "street": "Hollywood Boulevard",
        "number": "789",
        "complement": "Apt 10C",
        "complement2": "",
        "neighborhood": "Hollywood Hills",
        "city": "Los Angeles",
        "state": "California",
        "country": "USA",
        "zip_code": "90069"
    },
    {
        "users_id": "4",
        "orders_id": 4,
        "type": "billing_shipping",
        "street": "Beach Avenue",
        "number": "4321",
        "complement": "Unit 7",
        "complement2": "",
        "neighborhood": "Beachfront",
        "city": "Sydney",
        "state": "New South Wales",
        "country": "Australia",
        "zip_code": "2000"
    },
    {
        "users_id": "5",
        "orders_id": 5,
        "type": "shipping",
        "street": "Sunset Boulevard",
        "number": "987",
        "complement": "Suite 25",
        "complement2": "",
        "neighborhood": "Hollywood",
        "city": "Los Angeles",
        "state": "California",
        "country": "USA",
        "zip_code": "90028"
    },
    {
        "users_id": "6",
        "orders_id": 6,
        "type": "billing",
        "street": "Queen Street",
        "number": "246",
        "complement": "Apt 8D",
        "complement2": "",
        "neighborhood": "CBD",
        "city": "Sydney",
        "state": "New South Wales",
        "country": "Australia",
        "zip_code": "2000"
    }
];

export var orders = [
    {
        "id": 2,
        "users_id": 2,
        "total": 389.99,
        "order_number": 2,
        "status": "shipped"
    },
    {
        "id": 3,
        "users_id": 3,
        "total": 1999.99,
        "order_number": 3,
        "status": "delivered"
    },
    {
        "id": 4,
        "users_id": 4,
        "total": 499.99,
        "order_number": 4,
        "status": "processing"
    },
    {
        "id": 5,
        "users_id": 5,
        "total": 1299.99,
        "order_number": 5,
        "status": "shipped"
    },
    {
        "id": 6,
        "users_id": 6,
        "total": 699.99,
        "order_number": 6,
        "status": "completed"
    }
];

export var order_items = [
    {
        "orders_id": 2,
        "products_id": 2,
        "price": 54.53
    },
    {
        "orders_id": 3,
        "products_id": 3,
        "price": 129.99
    },
    {
        "orders_id": 5,
        "products_id": 4,
        "price": 24.99
    },
    {
        "orders_id": 4,
        "products_id": 5,
        "price": 199.99
    },
    {
        "orders_id": 6,
        "products_id": 6,
        "price": 39.99
    }
];

export var reviews = [
    {
        "id": 2,
        "title": "Great Laptop!",
        "text": "I love this laptop. It's super fast and lightweight.",
        "rating": 5,
        "users_id": 2,
        "products_id": 2
    },
    {
        "id": 3,
        "title": "Amazing Smartphone",
        "text": "The display on this smartphone is stunning, and the camera takes fantastic photos.",
        "rating": 4,
        "users_id": 3,
        "products_id": 3
    },
    {
        "id": 4,
        "title": "Excellent Headphones",
        "text": "These wireless headphones have great sound quality and noise cancellation.",
        "rating": 5,
        "users_id": 4,
        "products_id": 4
    },
    {
        "id": 5,
        "title": "Fantastic Camera",
        "text": "As a photographer, I'm impressed with the quality of photos this camera produces.",
        "rating": 5,
        "users_id": 5,
        "products_id": 5
    },
    {
        "id": 6,
        "title": "Great Tablet",
        "text": "This Android tablet is perfect for both work and entertainment.",
        "rating": 4,
        "users_id": 6,
        "products_id": 6
    }
];