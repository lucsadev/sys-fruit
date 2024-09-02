import {
  Alert,
  FlatList,
  StyleSheet,
  Text, 
  View,
} from "react-native";
import tw from "../lib/tailwind";
import useUsersStore from "../stores/userStore";
import { useEffect, useState } from "react";
import { ItemUser, UserForm } from "../components";
import { useToast } from "react-native-toast-notifications";
import { supabase } from "../lib/supabase";
import useAuthStore from "../stores/authStore";
import { SafeAreaView } from "react-native-safe-area-context";

FlatListHeaderList = () => (
  <View elevation={5} style={[styles.headerList, tw`md:h-16`]}>
    <View style={tw`flex flex-row items-center w-full h-full px-3`}>
      <Text style={tw`w-[45%] text-sm font-bold md:text-2xl`}>
        Nombre de usuario
      </Text>
      <Text style={tw`w-[35%] text-center text-sm font-bold md:text-2xl`}>
        Rol
      </Text>
    </View>
  </View>
);

const AdminUser = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const users = useUsersStore((state) => state.users);
  const getUsers = useUsersStore((state) => state.getUsers);
  const register = useAuthStore((state) => state.register);
  const toast = useToast();

  useEffect(() => {
    getUsers();
  }, []);

  const handleSave = async (data) => {
    try {
      if (!user?.id) {
        const { error } = await register({
          ...data,
          email: `${data.username}@${data.username}`,
        });
        const msg = error?.message?.includes("User already registered")
          ? "Ese usuario ya existe"
          : error;
        if (error) throw new Error(msg);

        await getUsers();
        toast.show("Usuario creado", { type: "success" });
      } else {
        const userAdmin = users?.filter((el) => el.role === "ADMIN");
        if (
          userAdmin.length === 1 &&
          data.username === userAdmin[0].username &&
          data.role !== "ADMIN"
        ) {
          Alert.alert(
            "Error",
            "No se puede dejar la App sin usuarios Administradores",
            [{ text: "Aceptar" }]
          );
          return;
        }
        const { error } = await supabase
          .from("profiles")
          .update({ username: data.username, role: data.role })
          .eq("id", user.id);
        if (error) throw error;
        await getUsers();
        toast.show("Usuario modificado", { type: "success" });
        setUser(null);
      }
    } catch (error) {
      Alert.alert("Error", error?.message || error, [{ text: "Aceptar" }]);
      return;
    }
  };

  const handleDelete = (user) => {
    try {
      const userAdmin = users?.filter((el) => el.role === "ADMIN");
      if (userAdmin.length > 1 || user.role !== "ADMIN") {
        Alert.alert("Eliminar", "¿Seguro que desea eliminar el usuario?", [
          {
            text: "No",
          },
          {
            text: "Si",
            onPress: async () => {
              try {
                const { error } = await supabase.rpc("deleteUser", {
                  userid: user.id,
                });
                if (error) throw error;
                await getUsers();
              } catch (error) {
                Alert.alert("Error", error?.message || error, [
                  { text: "Aceptar" },
                ]);
              }
            },
          },
        ]);
      } else
        Alert.alert(
          "Error",
          "No se puede dejar la App sin usuarios Administradores",
          [{ text: "Aceptar" }]
        );
    } catch (error) {
      Alert.alert("Error", error?.message || error, [{ text: "Aceptar" }]);
    }
  };

  return (
    <SafeAreaView>
      <View style={tw`w-full md:w-9/12 items-center gap-3 `}>
        <UserForm
          login={false}
          setUser={setUser}
          user={user}
          handleSave={handleSave}
        />
        <FlatList
          data={users}
          renderItem={({ item }) => (
            <ItemUser item={item} setUser={setUser} deleteUser={handleDelete} />
          )}
          ListHeaderComponent={FlatListHeaderList}
          stickyHeaderIndices={[0]}
          ItemSeparatorComponent={<View style={tw`w-full h-[1px] bg-black`} />}
          keyExtractor={(item) => item.id}
          style={tw`border border-black h-1/2`}
        />
      </View>
    </SafeAreaView>
  );
};
export default AdminUser;

const styles = StyleSheet.create({
  headerList: {
    justifyContent: "flex-end",
    height: 40,
    width: "100%",
    backgroundColor: "white",
    border: 2.9,
    borderColor: "black",
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 16,
    },
    shadowOpacity: 1,
    shadowRadius: 7.49,
  },
});
