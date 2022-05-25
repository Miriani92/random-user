import { useState, useEffect, useCallback } from "react";

export const useFetch = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();
  const [isError, setIsError] = useState({ hasError: false, message: "" });

  const getData = useCallback(async (url) => {
    setLoading(true);
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        if (data) {
          const person = data.results[0];
          const { phone, email } = person;
          const { age } = person.dob;
          const { name: street, number: streetNum } = person.location.street;
          const { first: firstName, last: lastName } = person.name;
          const image = person.picture.large;
          const passWord = person.login.password;
          const newUser = {
            phone,
            email,
            age,
            street,
            streetNum,
            name: `${firstName} ${lastName}`,
            image,
            passWord,
          };
          setLoading(false);
          setUser(newUser);
        }
      } else {
        setLoading(false);

        throw new Error("response status popblem");
      }
    } catch (error) {
      setLoading(false);
      setIsError({ ...isError, hasError: true, message: error.message });
    }
  }, []);

  return { loading, user, isError, getData };
};
