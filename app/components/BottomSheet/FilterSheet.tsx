import React, { forwardRef, useCallback, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, TextInput, StyleSheet } from 'react-native';
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { COLORS, FONTS } from '../../constants/theme';
import { useNavigation, useTheme } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import Button from '../Button/Button';
import FeatherIcon from "react-native-vector-icons/Feather";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform } from 'react-native';



const FilterOptionData = ["Transaction Type", "Category", "Entry By", "Party", "Cost Code", "Date", "Mode of Payment",];


const TransactionTypeFilterData = [
    {
      selected: true,
      title: "All",
    },
    {
      selected: false,
      title: "Payment In",
    },
    {
      selected: false,
      title: "Payment Out",
    },
    {
      selected: false,
      title: "Material Purchase",
    },
    {
      selected: false,
      title: "Material Return",
    },
    {
      selected: false,
      title: "Other Expense",
    },
    {
      selected: false,
      title: "Party Payment",
    },
];
const CategoryFilterData = [
    {
      selected: true,
      title: "All",
    },
    {
      selected: false,
      title: "Labour",
    },
    {
      selected: false,
      title: "Material",
    },
    {
      selected: false,
      title: "Transport",
    },
    {
      selected: false,
      title: "Equipment",
    },
    {
      selected: false,
      title: "Sub Contractor",
    },
    {
      selected: false,
      title: "Customer",
    },
]
const EntryByFilterData = [
    {
      selected: true,
      title: "All Entries",
    },
]
const PartyFilterData = [
    {
      selected: true,
      title: "All Party",
    },
    {
      selected: false,
      title: "W3 Chandan",
    },
    {
      selected: false,
      title: "W3 Yatin",
    },
    {
      selected: false,
      title: "W3 Kuldeep",
    },
];
const CostCodeFilterData = [
    {
      selected: true,
      title: "All",
    },
]
const DateFilterData = [
    {
      selected: true,
      title: "All",
    },
    {
      selected: false,
      title: "Today",
    }, {
      selected: false,
      title: "Last Week",
    },
    {
      selected: false,
      title: "Last Month",
    },
    {
      selected: false,
      title: "This Week",
    },
    {
      selected: false,
      title: "This month",
    },
]
const ModeofPaymentFilterData = [
    {
      selected: true,
      title: "All",
    },
    {
      selected: false,
      title: "Cash",
    },
    {
      selected: false,
      title: "Bank Transfer",
    },
    {
      selected: false,
      title: "Cheque",
    },
    {
      selected: false,
      title: "None",
    },
]


const FilterSheet = (props:any, ref:any) => {

  // ref
  const bottomSheetRef = useRef(null);


  // variables
  const snapPoints = useMemo(() => ['65%'], ['60%']);


  // callbacks
  const handleSheetChanges = useCallback((index:any) => {
    console.log('handleSheetChanges', index);
  }, []);


  // renders
  const renderBackdrop = useCallback(
    (props :any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
  );



  useImperativeHandle(ref, () => ({
    // methods connected to `ref`
    openSheet: () => { openSheet() }
  }))
  // internal method
  const openSheet = () => {
    bottomSheetRef.current.snapToIndex(0)
  }

  const theme = useTheme();
  const { colors } : {colors :any}  = theme;

  const handleClosePress = () => {
    bottomSheetRef.current.close()
  }


  const [activeFilter, setActiveFilter] = useState('TransactionType');
  const [TransactionTypeFilter, setTransactionTypeFilter] = useState(TransactionTypeFilterData);
  const [CategoryFilter, setCategoryFilter] = useState(CategoryFilterData);
  const [EntryByFilter, setEntryByFilter] = useState(EntryByFilterData);
  const [PartyFilter, setPartyFilter] = useState(PartyFilterData);
  const [CostCodeFilter, setCostCodeFilter] = useState(CostCodeFilterData);
  const [DateFilter, setDateFilter] = useState(DateFilterData);
  const [ModeofPaymentFilter, setModeofPaymentFilter] = useState(ModeofPaymentFilterData);
  const [filterData, setFilterData] = useState(TransactionTypeFilter);

  const handleFilterOption = (val:any) => {
    setActiveFilter(val);
    setFilterData(
      val == "Transaction Type" ? TransactionTypeFilter :
        val == "Category" ? CategoryFilter :
          val == "Entry By" ? EntryByFilter :
            val == "Party" ? PartyFilter :
              val == "Cost Code" ? CostCodeFilter :
                val == "Date" ? DateFilter :
                  val == "Mode of Payment" ? ModeofPaymentFilter :
                      []
    )
  }

  const handleFilterSelected = (val:any) => {
    let TransactionType = TransactionTypeFilter.map((data) => {
      if (val === data.title) {
        return { ...data, selected: !data.selected };
      }
      return data;
    });
    let Category = CategoryFilter.map((data) => {
      if (val === data.title) {
        return { ...data, selected: !data.selected };
      }
      return data;
    });
    let EntryBy = EntryByFilter.map((data) => {
      if (val === data.title) {
        return { ...data, selected: !data.selected };
      }
      return data;
    });
    let Party = PartyFilter.map((data) => {
      if (val === data.title) {
        return { ...data, selected: !data.selected };
      }
      return data;
    });
    let CostCode = CostCodeFilter.map((data) => {
      if (val === data.title) {
        return { ...data, selected: !data.selected };
      }
      return data;
    });
    let Date = DateFilter.map((data) => {
      if (val === data.title) {
        return { ...data, selected: !data.selected };
      }
      return data;
    });
    let ModeofPayment = ModeofPaymentFilter.map((data) => {
      if (val === data.title) {
        return { ...data, selected: !data.selected };
      }
      return data;
    });
    
    setTransactionTypeFilter(TransactionType);
    setCategoryFilter(Category);
    setEntryByFilter(EntryBy);
    setPartyFilter(Party);
    setCostCodeFilter(CostCode);
    setDateFilter(Date);
    setModeofPaymentFilter(ModeofPayment);
    setFilterData(
      activeFilter == "Transaction Type" ? TransactionType :
        activeFilter == "Category" ? Category :
          activeFilter == "Entry By" ? EntryBy :
            activeFilter == "Party" ? Party :
              activeFilter == "Cost Code" ? CostCode :
                activeFilter == "Date" ? Date :
                  activeFilter == "Mode of Payment" ? ModeofPayment :
                      []
    )
  };

  const [showPicker, setShowPicker] = useState(false);
  const [currentField, setCurrentField] = useState<'start' | 'end' | null>(null);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  const onChange = (event: any, selectedDate: Date | undefined) => {
      setShowPicker(false);
      if (selectedDate && currentField) {
          const formatted = selectedDate.toLocaleDateString();
      if (currentField === 'start') setStartDate(formatted);
          else setEndDate(formatted);
      }
  };

  const openPicker = (field: 'start' | 'end') => {
      setCurrentField(field);
      setShowPicker(true);
  };

  const DateInput = ({ label, value, onPress } : any) => (
      <View style={{ flex: 1,marginBottom:15 }}>
          <Text style={[styles.label,{...FONTS.fontMedium, fontSize: 14, color: colors.text,}]}>{label}</Text>
          <TouchableOpacity onPress={onPress} style={[styles.dateBox,{backgroundColor:colors.card}]}>
              <FeatherIcon name="calendar" size={16} color={COLORS.primary} />
              <Text numberOfLines={1} style={[{...FONTS.fontMedium, fontSize: 14, color: colors.title,paddingRight:20}]}>{value ? value : 'dd-mm-yyyy'}</Text>
          </TouchableOpacity>
      </View>
  );

  return (
    <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        enablePanDownToClose={true}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        backdropComponent={renderBackdrop}
        handleStyle={{ top: 0 }}
        handleIndicatorStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.30)', width: 92 }}
        backgroundStyle={{
            backgroundColor:colors.background,
            borderTopLeftRadius:20,
            borderTopRightRadius:20,
        }}
    >
      <BottomSheetView style={[GlobalStyleSheet.container, {padding:0, paddingTop: 0 ,flex:1}]}>
          <View style={{alignItems:'flex-end',paddingHorizontal:20,paddingBottom:20}}>
            <TouchableOpacity
              onPress={() => handleClosePress()}
              activeOpacity={0.5}
            >
              <Text style={{...FONTS.fontMedium,fontSize:18,color:COLORS.danger}}>Clear Filter</Text>
            </TouchableOpacity>
          </View>
          <View style={{
              flex: 1,
              flexDirection: 'row',
          }}>
            <View style={{backgroundColor:colors.card}}>
              <ScrollView>
                {FilterOptionData.map((data, index) => (
                    <TouchableOpacity
                      onPress={() => handleFilterOption(data)}
                      activeOpacity={0.5}
                      key={index}
                      style={[{
                        width:103,
                        height:60,
                        paddingHorizontal:12,
                        alignItems:'center',
                        justifyContent:'center',
                        backgroundColor:colors.card
                      },data === activeFilter && {
                        backgroundColor:COLORS.primary
                      }]}
                    >
                      <Text 
                      style={[{
                        ...FONTS.fontMedium,
                        fontSize:14,
                        color:colors.title,
                        textAlign:'center'
                      },data === activeFilter && {
                        color:COLORS.card
                      }]}>{data}</Text>
                    </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
            <View
              style={{
                flex: 1,
                paddingHorizontal:20,
                paddingLeft:13
              }}
            >
              <ScrollView>
                {activeFilter === 'Date' && 
                  <View style={{marginBottom:0}}>
                      <View style={[styles.row,{gap:12}]}>
                          <DateInput label="Start Date" value={startDate} onPress={() => openPicker('start')} />
                          <DateInput label="End Date" value={endDate} onPress={() => openPicker('end')} />
                      </View>

                      {showPicker && (
                          <DateTimePicker
                              value={new Date()}
                              mode="date"
                              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                              onChange={onChange}
                          />
                      )}
                  </View>
                }
                {filterData.map((data, index) => {
                  return (
                    <TouchableOpacity
                      onPress={() => handleFilterSelected(data.title)}
                      key={index}
                      style={styles.optionItem}
                    >
                      <View style={[styles.radioOuter, data.selected && styles.radioSelected]}>
                        {data.selected && <View style={styles.radioInner} />}
                      </View>
                      <Text style={[styles.optionText,{...FONTS.fontMedium,color:colors.title}]}>{data.title}</Text>
                    </TouchableOpacity>
                  )
                })}
              </ScrollView>
              <View
                style={[{
                  position:'absolute',
                  right:20,
                  left:13,
                  bottom:10
                }]}
              >
                <Button
                  title='View Results'
                  onPress={() => handleClosePress()}
                />
              </View>
            </View>
          </View>
      </BottomSheetView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderWidth:1,
    borderColor:'#EFEFEF',
    paddingVertical: 16,
    paddingHorizontal: 19,
    borderRadius: 8,
    marginBottom: 8,
  },
  optionText: {
    fontSize: 14,
    marginLeft: 12,
  },
  radioOuter: {
    height: 20,
    width: 20,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: COLORS.text,
    backgroundColor:COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioSelected: {
    borderColor: COLORS.primary,
  },
  radioInner: {
    height: 13,
    width: 13,
    borderRadius: 15,
    backgroundColor: COLORS.primary,
  },
  Button:{
        height:40,
        width:40,
        borderRadius:40,
        alignItems:'center',
        justifyContent:'center'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    label: {
        marginBottom: 10,
    },
    dateBox: {
        height:40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'flex-start',
        gap:10,
        paddingHorizontal: 15,
        borderWidth: 1.5,
        borderColor: '#E8E8E8', 
        borderRadius: 8,
        backgroundColor:COLORS.card
    },
});

export default forwardRef(FilterSheet);
