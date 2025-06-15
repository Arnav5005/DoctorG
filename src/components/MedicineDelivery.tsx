
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Search, ShoppingCart, Truck, Clock, MapPin, Plus, Minus } from "lucide-react";

export const MedicineDelivery = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState<any[]>([]);

  const medicines = [
    {
      id: 1,
      name: "Paracetamol 500mg",
      brand: "Crocin",
      price: 25,
      originalPrice: 30,
      discount: "17% OFF",
      inStock: true,
      prescription: false,
      image: "💊"
    },
    {
      id: 2,
      name: "Vitamin D3 1000IU",
      brand: "HealthKart",
      price: 350,
      originalPrice: 450,
      discount: "22% OFF",
      inStock: true,
      prescription: false,
      image: "💊"
    },
    {
      id: 3,
      name: "Amoxicillin 250mg",
      brand: "Generic",
      price: 120,
      originalPrice: 150,
      discount: "20% OFF",
      inStock: true,
      prescription: true,
      image: "💊"
    },
    {
      id: 4,
      name: "Cetirizine 10mg",
      brand: "Zyrtec",
      price: 45,
      originalPrice: 55,
      discount: "18% OFF",
      inStock: false,
      prescription: false,
      image: "💊"
    }
  ];

  const addToCart = (medicine: any) => {
    const existingItem = cart.find(item => item.id === medicine.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === medicine.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...medicine, quantity: 1 }]);
    }
  };

  const removeFromCart = (medicineId: number) => {
    setCart(cart.filter(item => item.id !== medicineId));
  };

  const updateQuantity = (medicineId: number, newQuantity: number) => {
    if (newQuantity === 0) {
      removeFromCart(medicineId);
    } else {
      setCart(cart.map(item => 
        item.id === medicineId 
          ? { ...item, quantity: newQuantity }
          : item
      ));
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const filteredMedicines = medicines.filter(medicine =>
    medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    medicine.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="dark:text-white flex items-center space-x-2">
            <Truck className="w-6 h-6" />
            <span>Medicine Delivery</span>
          </CardTitle>
          <p className="text-gray-600 dark:text-gray-300">
            Order medicines online with fast delivery to your doorstep
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search medicines..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
          </div>

          {/* Delivery Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
              <Clock className="w-4 h-4" />
              <span>2-4 hours delivery</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
              <MapPin className="w-4 h-4" />
              <span>Free delivery above ₹500</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
              <Truck className="w-4 h-4" />
              <span>24/7 available</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Medicine List */}
        <div className="lg:col-span-2 space-y-4">
          {filteredMedicines.map((medicine) => (
            <Card key={medicine.id} className="dark:bg-gray-800 dark:border-gray-700 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="text-4xl">{medicine.image}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white">{medicine.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{medicine.brand}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <span className="text-lg font-bold text-green-600">₹{medicine.price}</span>
                        <span className="text-sm text-gray-500 line-through">₹{medicine.originalPrice}</span>
                        <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                          {medicine.discount}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        {medicine.prescription && (
                          <Badge variant="outline" className="text-xs">
                            Prescription Required
                          </Badge>
                        )}
                        <Badge 
                          variant={medicine.inStock ? "default" : "destructive"}
                          className="text-xs"
                        >
                          {medicine.inStock ? "In Stock" : "Out of Stock"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-2">
                    {cart.find(item => item.id === medicine.id) ? (
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateQuantity(medicine.id, cart.find(item => item.id === medicine.id)!.quantity - 1)}
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="w-8 text-center font-medium">
                          {cart.find(item => item.id === medicine.id)?.quantity}
                        </span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateQuantity(medicine.id, cart.find(item => item.id === medicine.id)!.quantity + 1)}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    ) : (
                      <Button
                        onClick={() => addToCart(medicine)}
                        disabled={!medicine.inStock}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Add to Cart
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Cart */}
        <div className="lg:col-span-1">
          <Card className="dark:bg-gray-800 dark:border-gray-700 sticky top-4">
            <CardHeader>
              <CardTitle className="dark:text-white flex items-center space-x-2">
                <ShoppingCart className="w-5 h-5" />
                <span>Cart ({cart.length})</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {cart.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                  Your cart is empty
                </p>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm text-gray-900 dark:text-white">{item.name}</h4>
                        <p className="text-xs text-gray-600 dark:text-gray-300">₹{item.price} x {item.quantity}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-gray-900 dark:text-white">
                          ₹{item.price * item.quantity}
                        </span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                        >
                          ×
                        </Button>
                      </div>
                    </div>
                  ))}
                  
                  <Separator className="dark:bg-gray-700" />
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-300">Subtotal:</span>
                      <span className="font-medium text-gray-900 dark:text-white">₹{getTotalPrice()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-300">Delivery:</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {getTotalPrice() >= 500 ? "Free" : "₹50"}
                      </span>
                    </div>
                    <Separator className="dark:bg-gray-700" />
                    <div className="flex justify-between font-semibold">
                      <span className="text-gray-900 dark:text-white">Total:</span>
                      <span className="text-gray-900 dark:text-white">
                        ₹{getTotalPrice() + (getTotalPrice() >= 500 ? 0 : 50)}
                      </span>
                    </div>
                  </div>
                  
                  <Button className="w-full bg-green-600 hover:bg-green-700 mt-4">
                    Proceed to Checkout
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
