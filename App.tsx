import React from 'react';
import { 
  StyleSheet, Text, View, ScrollView, Image, 
  TouchableOpacity, SafeAreaView, StatusBar, Linking 
} from 'react-native';
import { ShoppingCart, Zap, MessageCircle, ArrowRight } from 'lucide-react-native';

const WHATSAPP_NUMBER = "917893026833"; // Your Business Number

const PRODUCTS = [
  { 
    id: '1', 
    name: 'Godrej Premium Milk', 
    weight: '500ml', 
    originalPrice: 30, 
    discountPrice: 15,
    image: 'https://cdn-icons-png.flaticon.com/512/869/869440.png'
  },
  { 
    id: '2', 
    name: 'Farm Fresh Eggs', 
    weight: '6 Pieces', 
    originalPrice: 40, 
    discountPrice: 20,
    image: 'https://cdn-icons-png.flaticon.com/512/2619/2619561.png'
  },
  { 
    id: '3', 
    name: 'Artisan White Bread', 
    weight: '400g', 
    originalPrice: 50, 
    discountPrice: 25,
    image: 'https://cdn-icons-png.flaticon.com/512/422/422409.png'
  },
  { 
    id: '4', 
    name: 'Organic Tomatoes', 
    weight: '1kg', 
    originalPrice: 60, 
    discountPrice: 30,
    image: 'https://cdn-icons-png.flaticon.com/512/1202/1202125.png'
  }
];

export default function App() {
  
  const orderOnWhatsApp = (product) => {
    const message = `Hi Koti! I want to order ${product.name} (${product.weight}) at the 50% discount price of ₹${product.discountPrice}. Please deliver to me!`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    Linking.openURL(url);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* --- HEADER --- */}
      <View style={styles.header}>
        <View>
          <Text style={styles.brand}>Koti Quick</Text>
          <View style={styles.badge}>
            <Zap size={12} color="#FFD600" fill="#FFD600" />
            <Text style={styles.badgeText}>EVERYTHING 50% OFF</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.cartBtn}>
          <ShoppingCart size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <Text style={styles.sectionTitle}>Daily Essentials</Text>
        
        <View style={styles.grid}>
          {PRODUCTS.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              style={styles.card}
              onPress={() => orderOnWhatsApp(item)}
            >
              <View style={styles.imageBox}>
                <Image source={{ uri: item.image }} style={styles.image} />
                <View style={styles.discountBadge}>
                  <Text style={styles.discountText}>-50%</Text>
                </View>
              </View>
              
              <View style={styles.info}>
                <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
                <Text style={styles.weight}>{item.weight}</Text>
                
                <View style={styles.priceRow}>
                  <View>
                    <Text style={styles.originalPrice}>₹{item.originalPrice}</Text>
                    <Text style={styles.price}>₹{item.discountPrice}</Text>
                  </View>
                  <View style={styles.buyBtn}>
                    <MessageCircle size={18} color="#fff" />
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>No Login Required • Fast Delivery</Text>
        </View>
      </ScrollView>

      {/* --- QUICK ACTION --- */}
      <View style={styles.bottomBar}>
        <TouchableOpacity 
          style={styles.mainBtn}
          onPress={() => Linking.openURL(`https://wa.me/${WHATSAPP_NUMBER}?text=Hi Koti! I need help with an order.`)}
        >
          <Text style={styles.mainBtnText}>Chat with Koti</Text>
          <ArrowRight size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  brand: {
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: -0.5,
    color: '#000',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    marginTop: 2,
    gap: 4
  },
  badgeText: {
    color: '#FFD600',
    fontSize: 10,
    fontWeight: '900',
  },
  cartBtn: {
    width: 45,
    height: 45,
    borderRadius: 15,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scroll: {
    padding: 20,
    paddingBottom: 120,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#333',
    marginBottom: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 15,
  },
  card: {
    width: '47%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  imageBox: {
    width: '100%',
    height: 100,
    backgroundColor: '#F9F9F9',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginBottom: 10,
  },
  image: {
    width: 60,
    height: 60,
  },
  discountBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#E23744',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  discountText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '900',
  },
  info: {
    gap: 2,
  },
  name: {
    fontSize: 14,
    fontWeight: '800',
    color: '#000',
  },
  weight: {
    fontSize: 12,
    color: '#888',
    fontWeight: '600',
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 8,
  },
  originalPrice: {
    fontSize: 12,
    color: '#AAA',
    textDecorationLine: 'line-through',
    fontWeight: '700',
  },
  price: {
    fontSize: 18,
    fontWeight: '900',
    color: '#000',
  },
  buyBtn: {
    backgroundColor: '#25D366', // WhatsApp Green
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    marginTop: 40,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#BBB',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 20,
    paddingBottom: Platform.OS === 'ios' ? 40 : 20,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  mainBtn: {
    backgroundColor: '#000',
    height: 56,
    borderRadius: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  mainBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '900',
  },
});
