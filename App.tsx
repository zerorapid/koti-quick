import React, { useState, useMemo } from 'react';
import { 
  StyleSheet, Text, View, ScrollView, Image, 
  TouchableOpacity, SafeAreaView, StatusBar, Linking, 
  Dimensions, Platform, TextInput, KeyboardAvoidingView
} from 'react-native';
import { ShoppingCart, Zap, MessageCircle, ArrowRight, Star, Clock, Search, Plus, Minus, X } from 'lucide-react-native';

const { width } = Dimensions.get('window');
const WHATSAPP_NUMBER = "917893026833";

const CATEGORIES = ["All", "Dairy", "Veggies", "Fruits", "Pantry"];

const PRODUCTS = [
  { id: '1', cat: 'Dairy', name: 'Godrej Milk', weight: '500ml', price: 30, disc: 15, img: 'https://cdn-icons-png.flaticon.com/512/869/869440.png' },
  { id: '2', cat: 'Dairy', name: 'Farm Eggs', weight: '6 Pcs', price: 40, disc: 20, img: 'https://cdn-icons-png.flaticon.com/512/2619/2619561.png' },
  { id: '3', cat: 'Pantry', name: 'Artisan Bread', weight: '400g', price: 50, disc: 25, img: 'https://cdn-icons-png.flaticon.com/512/422/422409.png' },
  { id: '4', cat: 'Veggies', name: 'Tomatoes', weight: '1kg', price: 60, disc: 30, img: 'https://cdn-icons-png.flaticon.com/512/1202/1202125.png' },
  { id: '5', cat: 'Veggies', name: 'Onions', weight: '1kg', price: 80, disc: 40, img: 'https://cdn-icons-png.flaticon.com/512/3014/3014515.png' },
  { id: '6', cat: 'Fruits', name: 'Apples', weight: '500g', price: 120, disc: 60, img: 'https://cdn-icons-png.flaticon.com/512/415/415733.png' },
  { id: '7', cat: 'Pantry', name: 'Basmati Rice', weight: '1kg', price: 180, disc: 90, img: 'https://cdn-icons-png.flaticon.com/512/3209/3209569.png' },
  { id: '8', cat: 'Dairy', name: 'Butter', weight: '100g', price: 100, disc: 50, img: 'https://cdn-icons-png.flaticon.com/512/2362/2362331.png' },
];

export default function App() {
  const [activeCat, setActiveCat] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState({}); // { id: quantity }

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      const matchesCat = activeCat === "All" || p.cat === activeCat;
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [activeCat, searchQuery]);

  const addToCart = (id) => {
    setCart(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const removeFromCart = (id) => {
    setCart(prev => {
      const newCart = { ...prev };
      if (newCart[id] > 1) newCart[id] -= 1;
      else delete newCart[id];
      return newCart;
    });
  };

  const cartItemsCount = Object.values(cart).reduce((a, b) => a + b, 0);
  const totalPrice = Object.keys(cart).reduce((sum, id) => {
    const product = PRODUCTS.find(p => p.id === id);
    return sum + (product.disc * cart[id]);
  }, 0);

  const checkout = () => {
    if (cartItemsCount === 0) return;
    
    let itemsText = "";
    Object.keys(cart).forEach(id => {
      const p = PRODUCTS.find(prod => prod.id === id);
      itemsText += `• ${p.name} (${p.weight}) x${cart[id]} - ₹${p.disc * cart[id]}\n`;
    });

    const message = `🚀 *KOTI-QUICK ORDER*\n----------------------\n${itemsText}----------------------\n💰 *TOTAL: ₹${totalPrice}*\n\n📍 *Please confirm delivery!*`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    Linking.openURL(url);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        
        {/* --- TURBO HEADER --- */}
        <View style={styles.header}>
          <View>
            <Text style={styles.brand}>KOTI</Text>
            <Text style={styles.subBrand}>TURBO V3</Text>
          </View>
          <View style={styles.headerRight}>
            <View style={styles.searchBox}>
              <Search size={16} color="#888" />
              <TextInput 
                placeholder="Search..." 
                style={styles.searchInput}
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholderTextColor="#AAA"
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity onPress={() => setSearchQuery("")}>
                  <X size={16} color="#AAA" />
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>

        {/* --- CATEGORY BAR --- */}
        <View style={styles.catBar}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20 }}>
            {CATEGORIES.map(cat => (
              <TouchableOpacity 
                key={cat} 
                style={[styles.catBtn, activeCat === cat && styles.catBtnActive]}
                onPress={() => setActiveCat(cat)}
              >
                <Text style={[styles.catText, activeCat === cat && styles.catTextActive]}>{cat}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
          
          {/* --- HERO --- */}
          {searchQuery === "" && (
            <View style={styles.hero}>
              <Text style={styles.heroTitle}>Flash Sale</Text>
              <Text style={styles.heroSubtitle}>Everything is 50% Off</Text>
              <View style={styles.heroBadge}>
                <Zap size={14} color="#000" fill="#000" />
                <Text style={styles.heroBadgeText}>ENDS SOON</Text>
              </View>
            </View>
          )}

          {/* --- GRID --- */}
          <View style={styles.grid}>
            {filteredProducts.map((item) => (
              <View key={item.id} style={styles.card}>
                <View style={styles.imageBox}>
                  <Image source={{ uri: item.img }} style={styles.image} />
                  <View style={styles.discountTag}>
                    <Text style={styles.discountTagText}>50% OFF</Text>
                  </View>
                </View>
                
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.weight}>{item.weight}</Text>
                
                <View style={styles.priceRow}>
                  <View>
                    <Text style={styles.originalPrice}>₹{item.price}</Text>
                    <Text style={styles.price}>₹{item.disc}</Text>
                  </View>
                  
                  {cart[item.id] ? (
                    <View style={styles.qtyContainer}>
                      <TouchableOpacity onPress={() => removeFromCart(item.id)} style={styles.qtyBtn}>
                        <Minus size={14} color="#000" />
                      </TouchableOpacity>
                      <Text style={styles.qtyText}>{cart[item.id]}</Text>
                      <TouchableOpacity onPress={() => addToCart(item.id)} style={styles.qtyBtn}>
                        <Plus size={14} color="#000" />
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <TouchableOpacity 
                      style={styles.addBtn}
                      onPress={() => addToCart(item.id)}
                    >
                      <Plus size={20} color="#fff" />
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            ))}
          </View>

          {filteredProducts.length === 0 && (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No products found 🔍</Text>
            </View>
          )}

          <View style={{ height: 120 }} />
        </ScrollView>

        {/* --- PERSISTENT CHECKOUT DOCK --- */}
        {cartItemsCount > 0 && (
          <View style={styles.dock}>
            <TouchableOpacity style={styles.mainAction} onPress={checkout}>
              <View style={styles.actionLeft}>
                <Text style={styles.itemCount}>{cartItemsCount} ITEMS</Text>
                <Text style={styles.totalPrice}>₹{totalPrice}</Text>
              </View>
              <View style={styles.actionRight}>
                <Text style={styles.mainActionText}>PLACE ORDER</Text>
                <ArrowRight size={20} color="#fff" />
              </View>
            </TouchableOpacity>
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
    paddingVertical: 20,
    alignItems: 'center',
  },
  brand: { fontSize: 28, fontWeight: '900', color: '#000', letterSpacing: -1 },
  subBrand: { fontSize: 12, fontWeight: '800', color: '#FFD600', marginTop: -8, backgroundColor: '#000', alignSelf: 'flex-start', paddingHorizontal: 4, borderRadius: 4 },
  headerRight: { flex: 1, marginLeft: 20 },
  searchBox: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#F5F5F5', 
    borderRadius: 15, 
    paddingHorizontal: 12, 
    height: 45,
    gap: 8
  },
  searchInput: { flex: 1, fontSize: 14, fontWeight: '600', color: '#000' },
  catBar: { marginBottom: 10 },
  catBtn: { 
    paddingHorizontal: 20, 
    paddingVertical: 10, 
    borderRadius: 12, 
    marginRight: 10, 
    backgroundColor: '#F5F5F5' 
  },
  catBtnActive: { backgroundColor: '#000' },
  catText: { fontSize: 14, fontWeight: '700', color: '#666' },
  catTextActive: { color: '#fff' },
  scroll: { paddingHorizontal: 25 },
  hero: { 
    backgroundColor: '#FFD600', 
    borderRadius: 25, 
    padding: 25, 
    marginVertical: 20,
    overflow: 'hidden'
  },
  heroTitle: { fontSize: 32, fontWeight: '900', color: '#000' },
  heroSubtitle: { fontSize: 16, fontWeight: '700', color: '#000', opacity: 0.7 },
  heroBadge: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#fff', 
    alignSelf: 'flex-start', 
    paddingHorizontal: 12, 
    paddingVertical: 6, 
    borderRadius: 10, 
    marginTop: 15, 
    gap: 5 
  },
  heroBadgeText: { fontSize: 10, fontWeight: '900', color: '#000' },
  grid: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    justifyContent: 'space-between', 
    gap: 20 
  },
  card: { 
    width: (width - 70) / 2, 
    backgroundColor: '#fff', 
    borderRadius: 20, 
    marginBottom: 10 
  },
  imageBox: { 
    width: '100%', height: 140, 
    backgroundColor: '#F8F8F8', 
    borderRadius: 20, 
    alignItems: 'center', 
    justifyContent: 'center',
    position: 'relative'
  },
  image: { width: 80, height: 80 },
  discountTag: { 
    position: 'absolute', top: 12, left: 12, 
    backgroundColor: '#E23744', 
    paddingHorizontal: 8, 
    paddingVertical: 4, 
    borderRadius: 8 
  },
  discountTagText: { color: '#fff', fontSize: 9, fontWeight: '900' },
  name: { fontSize: 16, fontWeight: '800', color: '#000', marginTop: 10 },
  weight: { fontSize: 12, color: '#AAA', fontWeight: '600' },
  priceRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginTop: 10 
  },
  originalPrice: { fontSize: 12, color: '#CCC', textDecorationLine: 'line-through', fontWeight: '700' },
  price: { fontSize: 20, fontWeight: '900', color: '#000' },
  addBtn: { 
    backgroundColor: '#000', 
    width: 40, height: 40, 
    borderRadius: 14, 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  qtyContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#FFD600', 
    borderRadius: 14, 
    paddingHorizontal: 4,
    height: 40
  },
  qtyBtn: { padding: 6 },
  qtyText: { fontSize: 16, fontWeight: '900', color: '#000', minWidth: 20, textAlign: 'center' },
  emptyState: { padding: 40, alignItems: 'center' },
  emptyText: { fontSize: 16, fontWeight: '700', color: '#AAA' },
  dock: { 
    position: 'absolute', bottom: 0, left: 0, right: 0, 
    backgroundColor: '#fff', 
    padding: 20, 
    paddingBottom: Platform.OS === 'ios' ? 40 : 20,
    borderTopWidth: 1, 
    borderTopColor: '#EEE',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 20
  },
  mainAction: { 
    backgroundColor: '#25D366', 
    height: 65, 
    borderRadius: 22, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    paddingHorizontal: 20
  },
  actionLeft: { },
  itemCount: { color: '#fff', fontSize: 10, fontWeight: '800', opacity: 0.8 },
  totalPrice: { color: '#fff', fontSize: 20, fontWeight: '900' },
  actionRight: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  mainActionText: { color: '#fff', fontSize: 16, fontWeight: '900' },
});

