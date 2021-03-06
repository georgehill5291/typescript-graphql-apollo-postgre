PGDMP                         y            reddit    13.4    13.4     ?           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            ?           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            ?           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            ?           1262    29344    reddit    DATABASE     j   CREATE DATABASE reddit WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'English_United States.1252';
    DROP DATABASE reddit;
                postgres    false            ?            1259    29378    post    TABLE     H  CREATE TABLE public.post (
    id integer NOT NULL,
    title character varying NOT NULL,
    "userId" integer NOT NULL,
    text character varying NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
    point integer DEFAULT 0 NOT NULL
);
    DROP TABLE public.post;
       public         heap    postgres    false            ?            1259    29376    post_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.post_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.post_id_seq;
       public          postgres    false    203            ?           0    0    post_id_seq    SEQUENCE OWNED BY     ;   ALTER SEQUENCE public.post_id_seq OWNED BY public.post.id;
          public          postgres    false    202            ?            1259    48057    upvote    TABLE     y   CREATE TABLE public.upvote (
    "userId" integer NOT NULL,
    "postId" integer NOT NULL,
    value integer NOT NULL
);
    DROP TABLE public.upvote;
       public         heap    postgres    false            ?            1259    29355    user    TABLE     8  CREATE TABLE public."user" (
    id integer NOT NULL,
    username character varying NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL
);
    DROP TABLE public."user";
       public         heap    postgres    false            ?            1259    29353    user_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.user_id_seq;
       public          postgres    false    201            ?           0    0    user_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;
          public          postgres    false    200            1           2604    29381    post id    DEFAULT     b   ALTER TABLE ONLY public.post ALTER COLUMN id SET DEFAULT nextval('public.post_id_seq'::regclass);
 6   ALTER TABLE public.post ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    202    203    203            .           2604    29358    user id    DEFAULT     d   ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);
 8   ALTER TABLE public."user" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    201    200    201            ?          0    29378    post 
   TABLE DATA           Z   COPY public.post (id, title, "userId", text, "createdAt", "updatedAt", point) FROM stdin;
    public          postgres    false    203   2       ?          0    48057    upvote 
   TABLE DATA           ;   COPY public.upvote ("userId", "postId", value) FROM stdin;
    public          postgres    false    204   ?        ?          0    29355    user 
   TABLE DATA           Y   COPY public."user" (id, username, email, password, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    201   ?        ?           0    0    post_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.post_id_seq', 17, true);
          public          postgres    false    202            ?           0    0    user_id_seq    SEQUENCE SET     9   SELECT pg_catalog.setval('public.user_id_seq', 9, true);
          public          postgres    false    200            >           2606    48061 %   upvote PK_802ac6b9099f86aa24eb22d9c05 
   CONSTRAINT     u   ALTER TABLE ONLY public.upvote
    ADD CONSTRAINT "PK_802ac6b9099f86aa24eb22d9c05" PRIMARY KEY ("userId", "postId");
 Q   ALTER TABLE ONLY public.upvote DROP CONSTRAINT "PK_802ac6b9099f86aa24eb22d9c05";
       public            postgres    false    204    204            <           2606    29388 #   post PK_be5fda3aac270b134ff9c21cdee 
   CONSTRAINT     c   ALTER TABLE ONLY public.post
    ADD CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee" PRIMARY KEY (id);
 O   ALTER TABLE ONLY public.post DROP CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee";
       public            postgres    false    203            6           2606    29365 #   user PK_cace4a159ff9f2512dd42373760 
   CONSTRAINT     e   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY (id);
 Q   ALTER TABLE ONLY public."user" DROP CONSTRAINT "PK_cace4a159ff9f2512dd42373760";
       public            postgres    false    201            8           2606    29367 #   user UQ_78a916df40e02a9deb1c4b75edb 
   CONSTRAINT     f   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE (username);
 Q   ALTER TABLE ONLY public."user" DROP CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb";
       public            postgres    false    201            :           2606    29369 #   user UQ_e12875dfb3b1d92d7d7c5377e22 
   CONSTRAINT     c   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE (email);
 Q   ALTER TABLE ONLY public."user" DROP CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22";
       public            postgres    false    201            A           2606    48133 %   upvote FK_3abd9f37a94f8db3c33bda4fdae    FK CONSTRAINT     ?   ALTER TABLE ONLY public.upvote
    ADD CONSTRAINT "FK_3abd9f37a94f8db3c33bda4fdae" FOREIGN KEY ("userId") REFERENCES public."user"(id);
 Q   ALTER TABLE ONLY public.upvote DROP CONSTRAINT "FK_3abd9f37a94f8db3c33bda4fdae";
       public          postgres    false    204    201    2870            ?           2606    47052 #   post FK_5c1cf55c308037b5aca1038a131    FK CONSTRAINT     ?   ALTER TABLE ONLY public.post
    ADD CONSTRAINT "FK_5c1cf55c308037b5aca1038a131" FOREIGN KEY ("userId") REFERENCES public."user"(id);
 O   ALTER TABLE ONLY public.post DROP CONSTRAINT "FK_5c1cf55c308037b5aca1038a131";
       public          postgres    false    201    2870    203            @           2606    48067 %   upvote FK_efc79eb8b81262456adfcb87de1    FK CONSTRAINT     ?   ALTER TABLE ONLY public.upvote
    ADD CONSTRAINT "FK_efc79eb8b81262456adfcb87de1" FOREIGN KEY ("postId") REFERENCES public.post(id);
 Q   ALTER TABLE ONLY public.upvote DROP CONSTRAINT "FK_efc79eb8b81262456adfcb87de1";
       public          postgres    false    204    203    2876            ?   s  x??T?n?0<K_???\J???? )?腖h??D
$e?ߕ?6???r??????C?d
.&?<;?Gx??<?	?8??q?@Կ"?=?^?䍍?@??e?A?uol7??/\C?*?Nk???i?B???????I{"??^?Q0??Ӵ?0ۣug?	?????0?˪?Ĭ?B?ոt&R??H??&ݚ?w4??S\?ٟ̉,??,|O[h???7?T??jnU6h5?aZ???Y?^{? d?2v?E?@(?T^?m??Aw+???'7̓?&,b7???,???~?z?PA/|???2B赎Zg?+˵??
Aы#Ud9
)Xa;??M0ͻ??~?nϊ:C^}????@~?u?????-}tC?8V9o?	gY??8`???2????e?[5Κ??EV
ĺ^??<EL&"H
??{?Q??(?M?7Lf?\?DQ6y??+\?,E?%???0?8??y?????E&?(??<b? 6?ee???[?-?<??ض?L??n]??_??E??<???B???L???k??eY~???B?N??&']E?U}???A?<+x???G?o?Wp?1X2Q}D,d?Q?R?_}@??????,Ь?U???7??UV?\?|????i??a?t      ?   ,   x?3?4??5?2?4?P?? ?D?)N??	T??5R1z\\\ ?      ?     x???Ko?Z?q?g??S??I??T?Uy?R%?("?"???_??SOn?q?k???k/?G?6????'N??J??Ao?l??x?RM?????	?Ο?z?skF??y?#g??-??T?bӗܫ?{5?ڊ???`?p??O?S7j?w?G ??#"??!?Р??????|??z??3??e3-?
t{???	6:-?n?b<?'??5?????UM??e`??|a??R!??a???7"?[??It?FkP+??W?i<3?_[????Iul?R?8?2l?	?y0w?%$???ͬ?vzv'^??[?Q????/Hu?u?4?1??F?Ћ?^??????z?Xq7??X?8???ڱ[F????t<?Z??<?Q????x4?-7;QԨ?ÿhL?X?D#XP?oD
??ٕ?????o??]????"?eXs?y??ou?&?f??w}c?C:?p??n???\????)*??5!P ?Q??)???Wn~??gS???]	?'7?ع?.???Y????lT;l:??ߌ3M???r??%?n??8]FX??a?U,tJ5?!?R?7R?E??{ݧ]H?#}??F~??y???b??D??v?'?7?|???ȃ
????p?7??q\GRL??BoD????[ޫ??޴a8?,?Ѳ<?[??8w?m6/?A???:?q+??2???I2?????\??J??????$??/???{? ?7????m???
Ы?j?^'?,?賂???=snv}?cW????$v????J?'Y?H??|???VCr??ƥ\*???(?n???     