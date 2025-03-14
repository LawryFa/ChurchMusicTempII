import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { HandHeart, Heart } from 'lucide-react-native';

export default function DonateScreen() {
  const [name, setName] = useState('');
  const [purpose, setPurpose] = useState('');
  const [phone, setPhone] = useState('');
  const [amount, setAmount] = useState('');

  const handleDonate = () => {
    // Handle donation logic here
    console.log({ name, purpose, phone, amount });
  };

  const predefinedAmounts = ['10', '25', '50', '100', '250', '500'];

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={['#6366f1', '#4f46e5']}
        style={styles.header}>
        <View style={styles.headerContent}>
          <HandHeart color="#fff" size={40} />
          <Text style={styles.headerTitle}>Make a Donation</Text>
          <Text style={styles.headerSubtitle}>
            Support our ministry and make a difference
          </Text>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.label}>Name (Optional)</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Your name"
            placeholderTextColor="#9ca3af"
          />

          <Text style={styles.label}>Purpose</Text>
          <TextInput
            style={styles.input}
            value={purpose}
            onChangeText={setPurpose}
            placeholder="Purpose of donation"
            placeholderTextColor="#9ca3af"
          />

          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            placeholder="Your phone number"
            keyboardType="phone-pad"
            placeholderTextColor="#9ca3af"
          />

          <Text style={styles.label}>Amount ($)</Text>
          <View style={styles.amountContainer}>
            <TextInput
              style={styles.amountInput}
              value={amount}
              onChangeText={setAmount}
              placeholder="Enter amount"
              keyboardType="numeric"
              placeholderTextColor="#9ca3af"
            />
          </View>

          <View style={styles.quickAmounts}>
            {predefinedAmounts.map((preset) => (
              <TouchableOpacity
                key={preset}
                style={[
                  styles.quickAmount,
                  amount === preset && styles.quickAmountSelected,
                ]}
                onPress={() => setAmount(preset)}>
                <Text
                  style={[
                    styles.quickAmountText,
                    amount === preset && styles.quickAmountTextSelected,
                  ]}>
                  ${preset}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            style={styles.donateButton}
            onPress={handleDonate}>
            <Text style={styles.donateButtonText}>Donate Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    height: 200,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  headerContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 16,
  },
  headerSubtitle: {
    color: '#fff',
    fontSize: 16,
    opacity: 0.9,
    marginTop: 8,
  },
  content: {
    padding: 20,
    marginTop: -40,
  },
  card: {
    marginTop: 49,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#1f2937',
    marginBottom: 16,
  },
  amountContainer: {
    marginBottom: 16,
  },
  amountInput: {
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#1f2937',
  },
  quickAmounts: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 24,
    marginHorizontal: -4,
  },
  quickAmount: {
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    padding: 12,
    margin: 4,
    minWidth: 80,
    alignItems: 'center',
  },
  quickAmountSelected: {
    backgroundColor: '#6366f1',
  },
  quickAmountText: {
    color: '#4b5563',
    fontSize: 16,
    fontWeight: '600',
  },
  quickAmountTextSelected: {
    color: '#fff',
  },
  donateButton: {
    backgroundColor: '#6366f1',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  donateButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});