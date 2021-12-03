import * as BaseDataLoader from 'dataloader';

/**
 * Nest injectable for the GraphQL dataloader library.
 *
 * Dataloader: https://github.com/graphql/dataloader. This library mainly allows
 * you to use dependency injection to manage the scope of a dataloader (usually
 * scoped to the request) within the NestJS framework. It constructs a
 * dataloader internally, and then provides a few convenience methods to access
 * the dataloader (such as `load`, `loadMany`, `clear`, `clearAll`). If you need
 * to use any features not directly exposed, you can use the `dataloader`
 * property to access the raw dataloader, or provide your own by overriding the
 * `createDataLoader` function, or by passing a dataloader object to the
 * constructor.
 *
 * ```
 * // users.loader.ts
 *
 * @Injectable({ scope: Scope.REQUEST })
 * export class UsersLoader extends DataLoader<string, User> {
 *   constructor(private readonly usersService: UsersService) {
 *     super();
 *   }
 *
 *   async perform(keys: string[]) {
 *     return await this.usersService.findUsers(keys);
 *   }
 * }
 * ```
 *
 * Then, you can use it in your resolvers (or services, or anything else
 * that supports dependency injection in NestJS:
 *
 * ```ts
 * // users.resolver.ts
 *
 * @Resolver()
 * export class UsersResolver {
 *   constructor(private readonly usersLoader: UsersLoader) {
 *     super();
 *   }
 *
 *   @Query(() => User)
 *   async user(@Args({ name: "id", type: () => Int}) id: number) {
 *     return this.usersLoader.load(id);
 *   }
 * }
 * ```
 *
 * Note the use of `Scope.REQUEST`. This makes it so that a new dataloader is
 * created for each request (which is probably what you want).
 *
 * Be sure to put `UserLoader` in your module providers.
 */
export abstract class DataLoader<K, V, C = K> {
  private readonly dataloader: BaseDataLoader<K, V, C>;

  constructor(dataloader?: BaseDataLoader<K, V, C>) {
    if (dataloader) this.dataloader = dataloader;
    else this.dataloader = this.createDataLoader();
  }

  abstract perform(keys: ReadonlyArray<K>): Promise<ArrayLike<V | Error>>;

  async load(key: K): Promise<V> {
    return this.dataloader.load(key);
  }

  async loadMany(keys: K[]): Promise<Array<V | Error>> {
    return this.dataloader.loadMany(keys);
  }

  clear(key: K): BaseDataLoader<K, V, C> {
    return this.dataloader.clear(key);
  }

  clearAll(): BaseDataLoader<K, V, C> {
    return this.dataloader.clearAll();
  }

  prime(key: K, value: V | Error): BaseDataLoader<K, V, C> {
    return this.dataloader.prime(key, value);
  }

  createDataLoader(): BaseDataLoader<K, V, C> {
    return new BaseDataLoader<K, V, C>(
      (k: ReadonlyArray<K>) => this.perform(k),
      this.getOptions(),
    );
  }

  getOptions(): BaseDataLoader.Options<K, V, C> {
    return {};
  }
}
