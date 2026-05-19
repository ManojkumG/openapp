import { type JSX } from 'react';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

import type { AuthGrid } from '../AuthScreen';
import { styles } from './homeStyles';

const heroImage = require('../../../images/market/hero.png');
const saltwaterImage = require('../../../images/market/saltwater.png');
const freshwaterImage = require('../../../images/market/freshwater.png');
const shellfishImage = require('../../../images/market/shellfish.png');
const prawnsImage = require('../../../images/market/prawns.png');
const seerImage = require('../../../images/market/seer-product.png');
const tigerPrawnsImage = require('../../../images/market/tiger-prawns.png');
const pomfretImage = require('../../../images/market/pomfret.png');
const homeIcon = require('../../../images/market/home-active.png');
const searchIcon = require('../../../images/market/search.png');
const basketIcon = require('../../../images/market/basket-muted.png');
const basketDarkIcon = require('../../../images/market/basket-dark.png');
const ordersIcon = require('../../../images/market/orders.png');
const accountIcon = require('../../../images/market/account.png');
const bellIcon = require('../../../images/market/bell.png');

type HomePageProps = {
  grid: AuthGrid;
};

const sections = [
  { image: saltwaterImage, numeral: 'I', specimens: '14 SPECIMENS', title: 'Saltwater' },
  { image: freshwaterImage, numeral: 'II', specimens: '12 SPECIMENS', title: 'Freshwater' },
  { image: shellfishImage, numeral: 'III', specimens: '8 SPECIMENS', title: 'Shellfish' },
  { image: prawnsImage, numeral: 'IV', specimens: '6 SPECIMENS', title: 'Prawns' },
];

const picks = [
  { image: seerImage, market: 'VANJIRAM', price: '₹780', title: 'Seer Fish' },
  { image: tigerPrawnsImage, market: 'ROYYALU', price: '₹640', title: 'Tiger Prawns' },
  { image: pomfretImage, market: 'CHANDWA', price: '₹920', title: 'Pomfret' },
];

const tabs = [
  { active: true, icon: homeIcon, label: 'MARKET' },
  { icon: searchIcon, label: 'SEARCH' },
  { badge: '2', icon: basketIcon, label: 'BASKET' },
  { icon: ordersIcon, label: 'ORDERS' },
  { icon: accountIcon, label: 'ACCOUNT' },
];

export default function HomePage({ grid }: HomePageProps): JSX.Element {
  const side = grid.gutter;
  const sectionGap = Math.max(12, grid.gap * 1.4);
  const sectionWidth = (grid.span(12) - sectionGap) / 2;
  const productWidth = Math.min(166, grid.span(5.2));

  return (
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: 122, paddingHorizontal: side },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.locationRow}>
            <View style={styles.plusMark}>
              <PlusLogo />
            </View>
            <View>
              <Text style={styles.deliverText}>DELIVER TO  ·  12 MIN</Text>
              <Text style={styles.locationText}>Banjara Hills⌄</Text>
            </View>
          </View>

          <View style={styles.headerActions}>
            <IconButton icon={bellIcon} />
            <View>
              <IconButton icon={basketDarkIcon} />
              <View style={styles.headerBadge}>
                <Text style={styles.badgeText}>2</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.hero}>
          <Image resizeMode="cover" source={heroImage} style={styles.heroImage} />
          <View style={styles.heroOverlay} />
          <Text style={styles.freshPill}>FRESH · 6:14 A.M.</Text>
          <Text style={styles.heroKicker}>- Today's catch -</Text>
          <Text style={styles.heroTitle}>Seer Fish · ₹780</Text>
          <Text style={styles.heroSubtitle}>Vizag harbour · trawler Lakshmi III</Text>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>SHOP BY SECTION</Text>
          <Text style={styles.actionLink}>SEE ALL →</Text>
        </View>

        <View style={[styles.sectionGrid, { gap: sectionGap }]}>
          {sections.map((section) => (
            <Pressable key={section.title} style={[styles.sectionCard, { width: sectionWidth }]}>
              <Image resizeMode="cover" source={section.image} style={styles.sectionImage} />
              <View style={styles.cardShade} />
              <Text style={styles.sectionNumeral}>- {section.numeral} -</Text>
              <Text style={styles.sectionName}>{section.title}</Text>
              <Text style={styles.specimens}>{section.specimens}</Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.picksHeader}>
          <View>
            <Text style={styles.sectionTitle}>TODAY'S PICKS</Text>
            <Text style={styles.picksScript}>landed within the last six hours</Text>
          </View>
          <Text style={styles.actionLink}>VIEW ALL →</Text>
        </View>

        <ScrollView
          contentContainerStyle={styles.productsRow}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {picks.map((product) => (
            <Pressable key={product.title} style={[styles.productCard, { width: productWidth }]}>
              <View style={styles.productImageWrap}>
                <Image resizeMode="cover" source={product.image} style={styles.productImage} />
                {product.title !== 'Pomfret' && <Text style={styles.productFresh}>FRESH</Text>}
              </View>
              <View style={styles.productInfo}>
                <Text style={styles.productName}>{product.title}</Text>
                <Text style={styles.productMeta}>{product.market} · 500G</Text>
                <View style={styles.priceRow}>
                  <Text style={styles.price}>{product.price}</Text>
                  <Pressable style={styles.addButton}>
                    <Text style={styles.addText}>+</Text>
                  </Pressable>
                </View>
              </View>
            </Pressable>
          ))}
        </ScrollView>
      </ScrollView>

      <View style={[styles.bottomNav, { maxWidth: grid.maxWidth }]}>
        {tabs.map((tab) => (
          <Pressable key={tab.label} style={styles.navItem}>
            <View>
              <Image resizeMode="contain" source={tab.icon} style={styles.navIcon} />
              {tab.badge ? (
                <View style={styles.navBadge}>
                  <Text style={styles.navBadgeText}>{tab.badge}</Text>
                </View>
              ) : null}
            </View>
            <Text style={[styles.navLabel, tab.active && styles.navLabelActive]}>{tab.label}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

function IconButton({ icon }: { icon: number }): JSX.Element {
  return (
    <Pressable style={styles.iconButton}>
      <Image resizeMode="contain" source={icon} style={styles.headerIcon} />
    </Pressable>
  );
}

function PlusLogo(): JSX.Element {
  return (
    <Svg width={34} height={34} viewBox="0 0 42 42" fill="none">
      <Circle cx={21} cy={21} r={20} stroke="#171717" strokeWidth={2} />
      <Path
        d="M17.464 34.212V25.712H9V17.464H17.464V9H25.712V17.464H34.212V25.712H25.712V34.212H17.464Z"
        fill="#c04a2c"
      />
    </Svg>
  );
}
