<script lang="ts">
	import Environment from '$lib/components/Environment.svelte';
	import Header from '$lib/components/Header.svelte';

	const headerLink = {
		url: '/home',
		label: 'Go to app'
	};
</script>

<Header linkOverride={headerLink} />

<div class="flex flex-col items-center mx-5">
	<h1 class="text-3xl font-bold my-3">Blazing Fire</h1>

	<div class="mb-3">
		<Environment />
	</div>

	<img alt="The project logo" src="/logo.png" class="w-24 my-3" />

	<p class="my-3">
		Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae vestibulum risus, in
		consectetur purus. Nulla sed nunc eu quam posuere rhoncus vitae vitae orci. Duis sodales, eros
		tristique finibus rutrum, purus tellus sodales tellus, ultricies sagittis sapien erat at risus.
		Sed sit amet felis rhoncus, malesuada massa eget, interdum sem. Cras placerat ullamcorper justo.
		Suspendisse potenti. Integer consequat luctus metus, et hendrerit quam bibendum non. Nunc
		porttitor sagittis diam, ut pretium lorem convallis eget. Nunc semper libero sed nisi gravida
		vehicula. Aenean a fermentum diam, eu hendrerit ante. Donec vulputate, mauris in feugiat
		tincidunt, turpis mauris vestibulum turpis, sit amet aliquam erat enim non est. Nullam vel
		volutpat metus, ac porttitor ligula. Suspendisse potenti. Integer dignissim eget neque id
		fermentum. Nam laoreet condimentum erat sit amet commodo. Aliquam quis elementum nunc, quis
		fringilla leo. Vestibulum in neque vehicula, cursus lacus sit amet, fringilla sapien. Duis ut
		leo et turpis vulputate condimentum. Praesent eu nisi nec velit hendrerit blandit eget quis
		ipsum. Fusce a semper enim, quis varius neque. Duis ut felis eu nisi dignissim pulvinar. Sed sit
		amet mauris libero. Mauris aliquet sagittis neque, a gravida elit rhoncus et. Pellentesque
		habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec id nunc
		ex. Phasellus ac dolor lectus. Maecenas posuere, est sed interdum convallis, quam quam posuere
		orci, nec posuere eros orci nec nibh. Nullam et varius orci, vel malesuada mi. Orci varius
		natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Praesent posuere quam
		quis commodo auctor. Nam placerat erat ut porttitor viverra. Maecenas mattis velit et est
		semper, et consequat libero aliquam. Duis facilisis quam lacus, id porta est facilisis id.
		Vivamus eleifend mauris at lacus efficitur fermentum. Phasellus eget rhoncus diam, sit amet
		porta neque. Maecenas venenatis auctor aliquet. Etiam convallis ullamcorper mattis. Phasellus
		imperdiet vel urna at volutpat. Morbi elementum in augue et dictum. Mauris vitae augue ut dui
		vehicula aliquam eget sed nibh. Aenean odio arcu, convallis vel eleifend quis, varius vitae
		lacus. Nunc posuere et erat ut feugiat. Suspendisse at cursus arcu. Fusce sodales, lectus quis
		facilisis mattis, odio sapien dictum sem, ut porta diam elit id nisl. Nunc ac ipsum nec sapien
		congue rutrum et id urna. Cras condimentum, dolor sed congue auctor, elit nisi tincidunt ex, sit
		amet rhoncus tellus massa id lorem. Duis ac felis nibh. Vivamus et metus tristique mauris
		volutpat volutpat. Proin massa ex, rhoncus vel sem eget, efficitur efficitur augue. Nullam
		tincidunt elementum fermentum. Vestibulum vitae vehicula est, vitae aliquet mauris. Cras
		malesuada fringilla ex quis molestie. Phasellus vehicula id libero quis pellentesque. Curabitur
		suscipit ultricies justo et pulvinar. Quisque eget lorem sapien. Pellentesque malesuada lobortis
		orci, in mattis magna varius eu. Vestibulum dui lorem, efficitur ac lectus ac, tempor dictum
		orci. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nunc viverra laoreet
		feugiat. Donec ut suscipit est. Proin quam sapien, placerat eget magna sit amet, commodo
		faucibus lorem. Etiam sit amet ornare dui, sed ultrices mauris. Vivamus pharetra risus non nisi
		lacinia, vitae tincidunt nisi commodo. Phasellus vitae dui bibendum, suscipit metus tincidunt,
		fermentum neque. Maecenas in pulvinar urna. Quisque elit dolor, lacinia sit amet facilisis in,
		vestibulum nec neque. Mauris aliquet justo ut ipsum rhoncus eleifend. Mauris mollis eleifend
		finibus. Pellentesque eget dapibus lectus. Praesent tempus nec purus sit amet facilisis. Integer
		aliquet eu purus quis condimentum. Quisque a leo laoreet, mollis augue in, vulputate mauris.
		Duis ultricies hendrerit nulla sodales consectetur. Fusce sed facilisis mi, non hendrerit nulla.
		Cras tristique felis vitae venenatis lacinia. Quisque suscipit lacus eros. Sed vel accumsan
		libero, nec hendrerit mauris. Praesent nunc lorem, pretium sit amet mauris ut, gravida convallis
		turpis. Phasellus eu tristique urna. In malesuada sagittis sapien, sit amet pellentesque nisi
		pretium sed. Sed eget turpis lacinia elit consequat interdum in ut turpis. Vestibulum ac auctor
		urna, quis venenatis dolor. Ut ultricies pharetra mauris, fringilla facilisis enim varius eget.
		Donec varius consectetur aliquet. Donec a pulvinar ligula. Pellentesque sit amet risus ut turpis
		faucibus pellentesque. Morbi sollicitudin nisl et est consequat tempor. Pellentesque luctus nunc
		id leo euismod, a tincidunt ante scelerisque. In et nisl eget tellus fermentum porta non
		suscipit justo. Proin at mauris in lacus fermentum aliquam eu vulputate urna. Suspendisse
		eleifend condimentum tellus quis feugiat. Nullam euismod aliquet urna in interdum. Donec
		dapibus, tortor vel posuere rutrum, mi tortor pulvinar justo, eget lacinia risus nisl blandit
		magna. Ut diam purus, consectetur quis sem eu, condimentum faucibus orci. Pellentesque at eros
		ornare, iaculis arcu tincidunt, feugiat elit. Duis dignissim dolor nec enim varius, in luctus
		turpis aliquet. Donec elementum neque aliquet feugiat tincidunt. Sed placerat nunc at purus
		dictum, vel maximus diam consectetur. Fusce viverra metus lectus, ac hendrerit est tincidunt et.
		In sit amet massa ac diam aliquam ornare. Sed pharetra congue purus ac porttitor. Maecenas id
		justo odio. Proin non est eu justo consequat luctus. Aliquam sit amet consequat justo, non
		commodo sem. Nulla efficitur enim quis nulla finibus euismod. Morbi faucibus blandit placerat.
		Phasellus posuere ipsum sem, eu varius leo dignissim non. Sed semper porta malesuada. Curabitur
		dignissim imperdiet libero vitae rhoncus. Praesent mi eros, lacinia vitae mattis id,
		pellentesque quis mi. Fusce luctus luctus mi, imperdiet vestibulum lectus convallis eu. In porta
		ante mauris, sed eleifend libero ultrices volutpat. Aenean id justo justo. Cras ultrices metus
		sed erat congue, at eleifend odio dapibus. Nullam fringilla feugiat ante, nec hendrerit tellus
		tincidunt ut. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos
		himenaeos. Proin iaculis lacinia dolor, vel vehicula nibh hendrerit eget. Phasellus euismod
		justo et pharetra imperdiet. Ut massa lacus, elementum nec elit a, aliquet pulvinar sapien.
		Aliquam tempus mi eu efficitur dapibus. In eget leo ac ligula volutpat suscipit. Aenean
		facilisis massa nec eros eleifend tincidunt. Mauris laoreet congue rhoncus. Vestibulum elit
		magna, eleifend vitae dui sit amet, consectetur aliquet urna. Suspendisse quis pharetra mi.
		Fusce rhoncus neque at congue hendrerit. Pellentesque non blandit arcu. Pellentesque at
		venenatis ipsum. Praesent porttitor nunc ac leo egestas, sed pellentesque mauris consectetur. Ut
		dolor ante, blandit quis rutrum a, eleifend vitae purus. In posuere pretium orci, nec
		scelerisque magna consequat et. Donec lacinia consequat massa id vehicula. Cras hendrerit purus
		ante, ut molestie augue laoreet in. Vestibulum sapien nisi, fringilla quis efficitur eu,
		suscipit quis velit. Sed commodo risus sed dignissim tempor. Curabitur ut elit a enim
		sollicitudin tristique. Donec nec malesuada leo. Duis ultricies auctor erat nec finibus. Fusce
		sed facilisis lacus. Aenean et ante quis erat facilisis posuere vitae quis lectus. Nulla maximus
		lectus eget erat rhoncus laoreet. Morbi cursus pharetra mattis. Ut accumsan ligula turpis. Ut
		dapibus faucibus elementum. Praesent facilisis et dui vel eleifend. Nullam vulputate, mauris id
		dictum blandit, orci libero efficitur augue, at scelerisque tellus neque ac quam. Nunc aliquam
		mattis erat a venenatis. Aenean lectus urna, congue ac odio vel, semper sollicitudin libero.
		Aenean et mi ac arcu bibendum rutrum nec et ante. Duis bibendum lectus quis consectetur
		consequat. Phasellus consequat augue neque, in suscipit sem condimentum id. Aliquam mollis ex
		nec purus egestas, eget tincidunt nibh aliquet. Cras tincidunt leo fermentum mollis vehicula.
		Phasellus a dui lorem. Quisque dui lorem, tincidunt ac consequat ac, mattis sed nulla. Praesent
		quam est, eleifend vel consectetur vel, sollicitudin et quam. Proin pretium orci est, eu congue
		odio imperdiet non. Vestibulum at nunc convallis, scelerisque eros in, tincidunt dui. Nunc
		aliquam ornare elit, vel efficitur arcu ultrices euismod. Phasellus nec diam eget lectus
		vulputate finibus. Pellentesque facilisis tellus non metus sollicitudin facilisis. Fusce
		lobortis est non metus efficitur, at pretium magna vulputate. Quisque consectetur nisl quis
		felis varius hendrerit. Aliquam aliquet blandit eros, vitae accumsan augue ultricies mollis.
		Proin pretium lacus in lectus vehicula laoreet. Curabitur mattis, nibh ut semper euismod, velit
		sem aliquam ipsum, tempus egestas lacus lacus eu ligula. Aliquam non laoreet enim, et sodales
		sapien. Suspendisse lectus nibh, scelerisque eget erat finibus, aliquet pulvinar enim. Integer
		vehicula dui in egestas malesuada. Curabitur malesuada nisi eros, eget posuere mauris dictum sit
		amet. Curabitur iaculis non dolor interdum gravida. Vivamus iaculis blandit urna, ut mollis
		ipsum venenatis a. Cras consequat interdum ex nec vestibulum. Duis a sapien varius, sollicitudin
		nisi at, accumsan arcu. Phasellus fermentum dignissim purus, non sollicitudin tellus scelerisque
		nec. Fusce a ullamcorper diam, eget rhoncus dui. Nam suscipit, ipsum ac convallis porttitor,
		dolor enim sodales arcu, quis tempor enim sem vitae urna. Mauris tempus purus eget eros
		ultricies, vel semper ligula rhoncus. Vestibulum pellentesque elementum leo ac ultricies. In
		purus arcu, euismod ut convallis et, luctus sed lacus. Vestibulum id volutpat diam, at porttitor
		magna. Vivamus at porta ante. Donec ultrices non lorem nec scelerisque. Nunc velit leo, sodales
		sit amet placerat vel, ullamcorper ut turpis. Donec interdum lectus vitae tortor eleifend
		scelerisque. Nulla tincidunt sem leo, nec euismod urna faucibus nec. Nullam congue elementum
		sollicitudin. Praesent interdum enim condimentum vulputate faucibus. Donec imperdiet, est et
		finibus rhoncus, neque est rhoncus justo, at dictum ante dolor sed nisi. Praesent in finibus
		turpis. Nunc ac imperdiet felis. Ut rutrum nisi nec lorem laoreet viverra. Proin accumsan ipsum
		vitae nisl volutpat commodo. Morbi ultrices interdum metus at sollicitudin. Aliquam maximus
		porttitor enim, malesuada bibendum arcu rhoncus ut. Sed pulvinar enim nulla, non vehicula orci
		tempus nec. Nam ultrices eu mauris eu tempor. Suspendisse potenti. Etiam dui elit, rhoncus nec
		lacus non, tincidunt suscipit mi. Phasellus at imperdiet diam, ut consequat odio. Aenean viverra
		mollis aliquam. Maecenas dictum lacus sed orci sodales, id tempor libero aliquet. Praesent quis
		tincidunt tortor. Praesent accumsan ac purus sed laoreet. In gravida urna sed ipsum tincidunt,
		id tristique ex rhoncus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per
		inceptos himenaeos. Praesent viverra, eros id vulputate mattis, orci orci eleifend enim, ut
		lobortis turpis lorem ut enim. Maecenas bibendum turpis eu arcu luctus consequat. Integer
		tincidunt fermentum nibh a dapibus. Donec a ligula at nibh aliquam vehicula ac vel augue.
		Maecenas vel mattis est. Phasellus quis libero in metus mattis consequat nec vitae dolor.
		Praesent consequat tristique nisl sit amet congue. Nullam lobortis est nec metus pulvinar, nec
		luctus lorem euismod. Vestibulum quis ex vehicula, mollis sapien in, consequat diam. Sed
		tristique tortor sit amet libero pellentesque, eget accumsan eros accumsan. Nam malesuada
		sollicitudin mattis. Donec eleifend nibh id imperdiet posuere. Proin at vehicula ipsum.
		Pellentesque pellentesque urna justo, sit amet dictum diam dictum ac. Nam eleifend nisl eu magna
		bibendum, nec scelerisque nunc venenatis. Mauris quis porta lorem. Nam lorem metus, feugiat id
		interdum a, dignissim a justo.
	</p>
</div>
