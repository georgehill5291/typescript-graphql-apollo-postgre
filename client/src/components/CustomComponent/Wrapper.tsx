import { Box } from "@chakra-ui/react";
import React, { ReactNode } from "react";

type WrapperSize = "regular" | "small";

interface IProps {
    children: ReactNode;
    size?: WrapperSize;
}

const Wrapper = ({ children, size = "regular" }: IProps) => {
    return (
        <Box maxW={size === "regular" ? "800px" : "400px"} w="100%" mt={8} mx="auto">
            {children}
        </Box>
    );
};

export default Wrapper;
